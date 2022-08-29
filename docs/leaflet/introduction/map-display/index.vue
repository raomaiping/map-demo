<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import { MAPURL, ATTRIBUTIONS, SHENZHEN } from '../../../constants'

const initMap = () => {
  const position = SHENZHEN.reverse()
  //地图容器
  const map = L.map('map').setView(position, 10)
  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map)
  //添加标注
  L.marker(position).addTo(map).bindPopup('您好！深圳').openPopup()
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
