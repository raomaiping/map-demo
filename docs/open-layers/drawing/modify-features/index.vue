<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Map, View, Feature } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { XYZ, Vector as VectorSource } from 'ol/source'
import { Style, Fill, Stroke, Circle } from 'ol/style'
import { Select, Modify as ModifyInteraction } from 'ol/interaction'
import { Polygon, Point, LineString } from 'ol/geom'
import { MAPURL, ATTRIBUTIONS } from '../../../constants'

//绘制的几何图形要素
const pointFeature = new Feature(new Point([114.1947, 30.5255]))
const lineFeature = new Feature(
  new LineString([
    [114.2218, 30.5695],
    [114.2829, 30.4912],
  ]),
)
const polygonFeature = new Feature(
  new Polygon([
    [
      [114.2757, 30.5822],
      [114.3526, 30.5879],
      [114.3608, 30.5367],
      [114.3234, 30.5187],
      [114.2826, 30.553],
    ],
  ]),
)
//实例化一个矢量图层Vector作为绘制层
const source = new VectorSource({
  features: [pointFeature, lineFeature, polygonFeature],
})
const vector = new VectorLayer({
  source: source,
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new Stroke({
      color: '#ff0000',
      width: 2,
    }),
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: '#ff0000',
      }),
    }),
  }),
})
let map = null
const raster = new TileLayer({
  source: new XYZ({
    attributions: ATTRIBUTIONS,
    url: MAPURL,
    maxZoom: 20,
  }),
})

const initMap = () => {
  map = new Map({
    //初始化map
    target: 'map',
    //地图容器中加载的图层
    layers: [
      //加载瓦片图层数据
      raster,
    ],
    view: new View({
      projection: 'EPSG:4326', // 坐标系，有EPSG:4326和EPSG:3 857
      center: [114.2905, 30.5607],
      //地图初始显示级别
      zoom: 12,
    }),
  })
}

//定义修改几何图形功能控件
const Modify = {
  init: function () {
    //初始化一个交互选择控件,并添加到地图容器中
    this.select = new Select()
    map.addInteraction(this.select)
    //初始化一个交互编辑控件，并添加到地图容器中
    this.modify = new ModifyInteraction({
      //选中的要素
      features: this.select.getFeatures(),
    })
    map.addInteraction(this.modify)
    //设置几何图形变更的处理
    this.setEvents()
  },
  setEvents: function () {
    //选中的要素
    const selectedFeatures = this.select.getFeatures()
    //添加选中要素变更事件
    this.select.on('change:active', () => {
      selectedFeatures.forEach(selectedFeatures.remove, selectedFeatures)
    })
  },
  setActive: function (active) {
    //激活选择要素控件
    this.select.setActive(active)
    //激活修改要素控件
    this.modify.setActive(active)
  },
}

onMounted(() => {
  initMap()
  //将绘制层添加到地图容器中
  map.addLayer(vector)
  //初始化几何图形修改控件
  Modify.init()
  //激活几何图形修改控件;
  Modify.setActive(true)
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
}
</style>
