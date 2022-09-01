<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import { MAPURL, ATTRIBUTIONS } from '/constants'

const initMap = () => {
  //地图容器
  const map = L.map('map').setView([22.548857, 114.064839], 10)
  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map)
  //添加标注
  L.marker([22.548857, 114.064839]).addTo(map).bindPopup('您好！深圳').openPopup()
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
