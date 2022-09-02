<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import { MAPURL, ATTRIBUTIONS } from '/constants'

const initMap = () => {
  //地图容器
  const map = L.map('map', {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: [22.548857, 114.064839],
    //当前显示等级
    zoom: 10,
  })

  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map)

  //添加图片标注
  L.marker([22.548857, 114.064839], {
    //是否允许鼠标拖动
    draggable: true,
    //添加悬浮名称
    title: '深圳',
  }).addTo(map)

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
  color: #3a3a3a;
}
</style>
