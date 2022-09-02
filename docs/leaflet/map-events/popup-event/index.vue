<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import { MAPURL, ATTRIBUTIONS } from '/constants'
let map = null
const initMap = () => {
  //地图容器
  map = L.map('map', {
    //地图渲染在canvas上
    preferCanvas: true,
    //参考坐标系
    crs: L.CRS.EPSG3857,
    // 显示中心
    center: [22.548857, 114.064839],
    // 缩放级别
    zoom: 10,
  })
  //添加标注，设置弹框提示
  L.marker([22.548857, 114.064839]).addTo(map).bindPopup('<b>Hello world!</b>')
  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map)

  /**Popup弹出事件
   *  @param {string} type 事件类型（popup弹出）
   *  @param {function} fn 事件触发后的响应函数
   */
  map.on('popupopen', (e) => {
    //弹框提示
    alert('Popup弹出！')
  })

  /**Popup关闭事件
   *  @param {string} type 事件类型（popup关闭）
   *  @param {function} fn 事件触发后的响应函数
   */
  map.on('popupclose', (e) => {
    //弹框提示
    alert('Popup关闭！')
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
  color: #3a3a3a;
}
</style>
