<template>
  <div id="menu">
    几何图形类型：
    <el-select v-model="state.value" size="large" @change="handleChange">
      <el-option
        v-for="item in state.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { Map, View } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { XYZ, Vector as VectorSource } from 'ol/source'
import { Style, Fill, Stroke, Circle } from 'ol/style'
import { Draw } from 'ol/interaction'
import { createRegularPolygon } from 'ol/interaction/Draw'
import { Polygon } from 'ol/geom'
import { MAPURL, ATTRIBUTIONS } from '/constants'

let map = null
let draw = null // 绘制对象
const state = reactive({
  value: 'Point',
  options: [
    {
      label: '无',
      value: 'None',
    },
    {
      label: '点',
      value: 'Point',
    },
    {
      label: '线',
      value: 'LineString',
    },
    {
      label: '多边形',
      value: 'Polygon',
    },
    {
      label: '圆',
      value: 'Circle',
    },
    {
      label: '正方形',
      value: 'Square',
    },
    {
      label: '长方形',
      value: 'Box',
    },
  ],
})
//实例化一个矢量图层Vector作为绘制层
let source = new VectorSource({ wrapX: false })
const vector = new VectorLayer({
  source,
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
      center: [0, 0], // 深圳坐标
      //地图初始显示级别
      zoom: 5,
    }),
  })
}

//根据绘制类型进行交互绘制图形处理
const addInteraction = () => {
  //绘制类型
  let value = state.value
  if (value !== 'None') {
    if (source == null) {
      source = new VectorSource({ wrapX: false })
      //添加绘制层数据源
      vector.setSource(source)
    }
    let geometryFunction, maxPoints
    if (value === 'Square') {
      value = 'Circle'
      //正方形图形（圆）
      geometryFunction = createRegularPolygon(4)
    } else if (value === 'Box') {
      value = 'LineString'
      maxPoints = 2
      geometryFunction = (coordinates, geometry) => {
        var start = coordinates[0]
        var end = coordinates[1]
        if (!geometry) {
          //多边形
          geometry = new Polygon([
            [start, [start[0], end[1]], end, [end[0], start[1]], start],
          ])
        }
        geometry.setCoordinates([
          [start, [start[0], end[1]], end, [end[0], start[1]], start],
        ])
        return geometry
      }
    }
    //实例化交互绘制类对象并添加到地图容器中
    draw = new Draw({
      //绘制层数据源
      source: source,
      /** @type {ol.geom.GeometryType}几何图形类型 */
      type: value,
      //几何信息变更时调用函数
      geometryFunction: geometryFunction,
      //最大点数
      maxPoints: maxPoints,
    })
    map.addInteraction(draw)
  } else {
    source = null
    //清空绘制图形
    vector.setSource(source)
  }
}
const handleChange = () => {
  //移除绘制图形
  map.removeInteraction(draw)
  //添加交互绘制功能控件
  addInteraction()
}
onMounted(() => {
  initMap()
  //将绘制层添加到地图容器中
  map.addLayer(vector)
  //添加交互绘制功能控件
  addInteraction()
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
}
#menu {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>
