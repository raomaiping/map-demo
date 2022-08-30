<template>
  <div class="btns">
    <el-button type="primary" @click="handleZoomOut">单击缩小</el-button>
    <el-button type="primary" @click="handleZoomIn">单击放大</el-button>
    <el-button type="primary" @click="handlePanToSZ">平移到【深圳】</el-button>
    <el-button type="primary" @click="handleRestore">复位</el-button>
  </div>

  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Map, View } from 'ol'
import { defaults, ZoomToExtent } from 'ol/control'
import { Tile as TileLayer } from 'ol/layer'
import { XYZ } from 'ol/source'
import { MAPURL, ATTRIBUTIONS } from '/constants'
let map
//地图视图的初始参数
let view
let zoom
let center
let rotation

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
    controls: defaults({
      /** @type {olx.control.AttributionOptions} */
      attributionOptions: {
        collapsible: true,
      },
    }).extend([
      new ZoomToExtent({
        extent: [
          // 坐标值
          813079.7791264898,
          5929220.284081122,
          848966.9639063801,
          5936863.986909639,
        ],
      }),
    ]),
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
      //最小级别
      minZoom: 1,
      //最大级别
      maxZoom: 18,
      //设置旋转角度
      rotation: Math.PI / 6,
    }),
  })
  //设置地图视图的初始参数
  view = map.getView()
  zoom = view.getZoom()
  center = view.getCenter()
  rotation = view.getRotation()
}

// 缩小
const handleZoomOut = () => {
  //获取地图视图
  const view = map.getView()
  //获得当前缩放级数
  const zoom = view.getZoom()
  //地图缩小一级
  view.setZoom(zoom - 1)
}
//放大
const handleZoomIn = () => {
  //获取地图视图
  const view = map.getView()
  //获得当前缩放级数
  const zoom = view.getZoom()
  //地图放大一级
  view.setZoom(zoom + 1)
}

// 平移到深圳
const handlePanToSZ = () => {
  //获取地图视图
  const view = map.getView()
  //平移地图
  view.setCenter([114.064839, 22.548857])
  view.setZoom(12)
}
// 复位
const handleRestore = () => {
  //初始中心点
  view.setCenter(center)
  //初始旋转角度
  view.setRotation(rotation)
  //初始缩放级数
  view.setZoom(zoom)
}
onMounted(() => {
  initMap()
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 100%;
  height: 650px;
}

.btns {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
}
</style>
