<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet.chinatmsproviders'
import { ATTRIBUTIONS } from '/constants'

const initMap = () => {
  //地图容器
  const map = L.map('map', {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: [22.548857, 114.064839],
    //最小显示等级
    minZoom: 1,
    //最大显示等级
    maxZoom: 18,
    //当前显示等级
    zoom: 12,
  })
  //添加地图
  const vectorMap = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
    //最大级数
    maxZoom: 18,
    //最小级数
    minZoom: 1,
    //设置版权
    attribution: ATTRIBUTIONS,
  })
  //初始时加载无色地图
  map.addLayer(vectorMap)

  // 销毁地图
  onUnmounted(() => {
    map.remove()
  })
}
onMounted(() => {
  initMap()
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
}
</style>
