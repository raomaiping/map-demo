<template>
  <div class="top">
    <el-button type="primary" @click="handleProjection">动态投影转换</el-button>
  </div>
  <div class="mapBox">
    <div class="map" ref="map1">
      <div class="title">投影坐标系（EPSG:3857）</div>
    </div>
    <div class="map" ref="map2">
      <div class="title">投影坐标系（ESRI:53009）</div>
    </div>
  </div>
</template>

<script setup>
import 'ol/ol.css'
import { onMounted, ref } from 'vue'
import { Map, View, Graticule } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { defaults, FullScreen } from 'ol/control'
import { XYZ, Vector as VectorSource } from 'ol/source'
import { GeoJSON } from 'ol/format'
import { ATTRIBUTIONS } from '../../constants'
import { get, Projection } from 'ol/proj'
import { register } from 'ol/proj/proj4'
import proj4 from 'proj4'
const map1 = ref(null)
const map2 = ref(null)
let transformMap
//定义球形摩尔魏特投影坐标系，对应ESRI的编号为ESRI:53009
proj4.defs(
  'ESRI:53009',
  '+proj=moll +lon_0=0 +x_0=0 +y_0=0 +a=6371000 ' +
    '+b=6371000 +units=m +no_defs',
)
register(proj4)
const sphereMollweideProjection = new Projection({
  code: 'ESRI:53009', //编号
  extent: [
    -9009954.605703328,
    -9009954.605703328,
    9009954.605703328,
    9009954.605703328,
  ], //范围
  worldExtent: [-179, -90, 179, 90], //世界经纬度范围
})

const vectLayer = new VectorLayer({
  source: new VectorSource({
    url: './countries.geojson',
    format: new GeoJSON(),
    wrapX: false,
  }),
})

const initMap = () => {
  new Map({
    //初始化map
    target: map1.value,
    //地图容器中加载的图层
    layers: [
      new TileLayer({
        title: '天地图矢量图层',
        source: new XYZ({
          attributions: ATTRIBUTIONS,
          url:
            'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=3bc6874f2b919aa581635abab7759a3f',
          wrapX: false,
        }),
      }),
      vectLayer,
      new TileLayer({
        title: '天地图矢量图层注记',
        source: new XYZ({
          attributions: ATTRIBUTIONS,
          url:
            'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=3bc6874f2b919aa581635abab7759a3f',
          wrapX: false,
        }),
      }),
    ],
    view: new View({
      projection: get('EPSG:3857'), // 坐标系，有EPSG:4326和EPSG:3857
      center: [0, 0], // 深圳坐标
      //地图初始显示级别
      zoom: 1,
    }),
    //加载控件到地图容器中
    controls: defaults().extend([
      new FullScreen(), //加载全屏显示控件（目前支持非IE内核浏览器）
    ]),
  })
}
// 开始投影转换
const handleProjection = () => {
  if (transformMap == null || transformMap == undefined) {
    transformMap = new Map({
      layers: [
        new VectorLayer({
          source: new VectorSource({
            url: './countries.geojson',
            format: new GeoJSON(),
          }),
        }),
      ],
      target: map2.value,
      view: new View({
        projection: sphereMollweideProjection, //投影坐标系
        center: [120, 40],
        zoom: 1,
      }),
    })
    new Graticule({
      //参考系标线
      map: transformMap, //显示参考系标线的地图
    })
  }
}
onMounted(() => {
  initMap()
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.mapBox {
  height: 650px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}
.map {
  position: relative;
  width: 100%;
  height: 48%;
  border: 2px dashed red;
  box-shadow: 0 0 10px #000;
}
.title {
  width: 200px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  color: red;
  text-align: center;
}
</style>
