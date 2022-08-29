<template>
  <div id="top">
    <el-button type="primary" @click="handleAdd">添加聚合标注</el-button>
    <el-button type="danger" @click="handleDelete">移除聚合标注</el-button>
  </div>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Map, View } from 'ol'
import { Tile as TileLayer } from 'ol/layer'
import { defaults, FullScreen } from 'ol/control'
import { XYZ } from 'ol/source'
import { ATTRIBUTIONS, MAPURL } from '../../../constants'
import { addClusterLabels, removeClusterLabels, clusters } from './clusters'
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
      clusters, // 聚合标注图层
    ],
    view: new View({
      center: [0, 0],
      minZoom: 2,
      zoom: 2,
    }),
    //加载控件到地图容器中
    controls: defaults().extend([
      new FullScreen(), //加载全屏显示控件（目前支持非IE内核浏览器）
    ]),
  })
}
// 添加聚合要素
const handleAdd = () => {
  addClusterLabels(map)
}

// 移除聚合要素
const handleDelete = () => {
  removeClusterLabels(map)
}
onMounted(() => {
  initMap()
  removeClusterLabels(map)
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
}
#top {
  text-align: center;
  height: 50px;
  line-height: 50px;
}
</style>
