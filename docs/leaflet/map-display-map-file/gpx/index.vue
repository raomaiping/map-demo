<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet-gpx'
import { MAPURL, ATTRIBUTIONS } from '../../../constants'

const initMap = () => {
  //地图容器
  const map = L.map('map', {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: [42.45, -71.11],
    //最小显示等级
    minZoom: 1,
    //最大显示等级
    maxZoom: 18,
    //当前显示等级
    zoom: 15,
  })
  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map)
  // 加载 gpx
  const gpx = '/gpx/fells_loop.gpx'
  new L.GPX(gpx, {
    async: true,
    marker_options: {
      startIconUrl: '/image/pin-icon-start.png',
      endIconUrl: '/image/pin-icon-end.png',
      shadowUrl: '/image/pin-shadow.png',
      wptIconUrls: {
        '': '/image/pin-icon-wpt.png',
      },
    },
  })
    .on('loaded', (e) => {
      map.fitBounds(e.target.getBounds())
    })
    .addTo(map)
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
