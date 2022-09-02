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

  //添加marker标注，设置透明度为0
  const marker = L.marker([22.548857, 114.064839], {
    opacity: 0,
  }).addTo(map)
  //添加tooltip标注
  marker
    .bindTooltip('深圳', {
      //标注始终存在
      permanent: true,
      //显示位置
      direction: 'right',
      //标注的css样式类名
      className: 'tooltip',
    })
    .openTooltip()

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
:deep(.tooltip) {
  font: italic bold 16px/30px arial, sans-serif;
  color: red;
  width: 60px;
  text-align: center;
  border: 0;
}

:deep(.leaflet-tooltip) {
  box-shadow: 0px 0px 0px rgba(255, 255, 255, 0) !important;
  background-color: rgba(255, 255, 255, 0) !important;
}

:deep(.leaflet-tooltip-right:before) {
  border-right-color: rgba(255, 255, 255, 0) !important;
}
</style>
