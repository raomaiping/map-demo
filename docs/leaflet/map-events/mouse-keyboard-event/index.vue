<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import { ElMessageBox } from 'element-plus'
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

  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map)

  /**地图单击事件
   *  @param {string} type 事件类型（地图单击）
   *  @param {function} fn 事件触发后的响应函数
   */
  map.on('click', (e) => {
    //获取点击位置的坐标
    const coordinate = [e.latlng.lat, e.latlng.lng]
    //弹框提示点击位置的坐标
    ElMessageBox.alert(`点击位置为：${coordinate}`, '地图被单击了！', {
      confirmButtonText: '收到',
    })
  })

  /**键盘按下事件
   *  @param {string} type 事件类型（键盘按下）
   *  @param {function} fn 事件触发后的响应函数
   */
  map.on('keypress', (e) => {
    //弹框提示输入的值
    ElMessageBox.alert(`${e.originalEvent.key}键被按下了`, '按下了键盘!', {
      confirmButtonText: '收到',
    })
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
