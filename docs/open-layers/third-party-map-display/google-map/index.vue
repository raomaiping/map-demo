<template>
  <div id="map"></div>
</template>

<script setup>
import { Map, View } from 'ol'
import { Tile as TileLayer } from 'ol/layer'
import { onMounted } from 'vue'
import { XYZ } from 'ol/source'
import { ATTRIBUTIONS } from '/constants'

const raster = new TileLayer({
  title: '谷歌地图',
  source: new XYZ({
    attributions: ATTRIBUTIONS,
    url:
      'http://mt2.google.cn/vt/lyrs=m@167000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
    maxZoom: 20,
  }),
})

onMounted(() => {
  new Map({
    //地图容器div的ID
    target: 'map',
    //地图容器中加载的图层
    layers: [
      //加载瓦片图层数据
      raster,
    ],
    //地图视图设置
    view: new View({
      //地图初始中心点
      center: [0, 0],
      //地图初始显示级别
      zoom: 2,
    }),
  })
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
}
</style>
