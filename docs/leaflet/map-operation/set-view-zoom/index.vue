<template>
  <div class="top-bar">
    <el-input-number v-model="zoom" :min="1" :max="18" @change="setViewZoom" />
  </div>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import L from 'leaflet'
import { MAPURL, ATTRIBUTIONS, SHENZHEN } from '/constants'
const zoom = ref(17)
let map = null
const position = SHENZHEN.reverse()
const initMap = () => {
  //地图容器
  map = L.map('map', {
    zoomControl: false,
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: position,
    //最小显示等级
    minZoom: 1,
    //最大显示等级
    maxZoom: 18,
    //当前显示等级
    zoom: 10,
    //限制显示地理范围
    maxBounds: L.latLngBounds(L.latLng(-180, -180), L.latLng(180, 180)),
  })
  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map)
  // 销毁地图
  onUnmounted(() => {
    map.remove()
  })
}

// 设置显示地图级数
const setViewZoom = () => {
  //将地图按照指定级数显示
  map.setView(map.getCenter(), zoom.value)
}
onMounted(() => {
  initMap()
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
  color: #3a3a3a;
}
.top-bar {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>
