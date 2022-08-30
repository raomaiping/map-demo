<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet.chinatmsproviders'
import { ATTRIBUTIONS, SHENZHEN } from '../../../constants'

const initMap = () => {
  const position = SHENZHEN.reverse()
  //地图容器
  const map = L.map('map', {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: position,
    //最小显示等级
    minZoom: 1,
    //最大显示等级
    maxZoom: 18,
    //当前显示等级
    zoom: 12,
  })
  //添加高德地图矢量图层
  const vectorMap = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
    //最大级数
    maxZoom: 18,
    //最小级数
    minZoom: 1,
    //设置版权
    attribution: ATTRIBUTIONS,
  })
  //初始时加载矢量图层组
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
