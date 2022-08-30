<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import { MAPURL, ATTRIBUTIONS, SHENZHEN } from '/constants'

const initMap = () => {
  const position = SHENZHEN.reverse()
  //地图容器
  const map = L.map('map').setView(position, 10)
  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map)
  // 定位Geolocation
  map.locate({
    setView: true,
    maxZoom: 18,
  })
  //注册定位成功事件
  map.on('locationfound', (e) => {
    const radius = e.accuracy / 2
    L.marker(e.latlng).addTo(map).bindPopup('你就在这个圈内')
    L.circle(e.latlng, radius).addTo(map)
  })
  //注册定位失败事件
  map.on('locationerror', (e) => {
    console.log('定位出错=====>', e)
  })
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
