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
  const Marker = L.marker([22.548857, 114.064839]).addTo(map)

  /**鼠标单击事件
   *  @param {string} type 事件类型（鼠标单击）
   *  @param {function} fn 事件触发后的响应函数
   */
  Marker.on('click', function () {
    //添加Popup标注，显示一段文字和一幅图片
    L.popup()
      .setLatLng([22.548857, 114.064839])
      .setContent(
        '<div style="width:268px;font-size:16px;margin-bottom:10px;">我在深圳打工！</div> <img style="width:268px;" src="/image/shenzhen-pic.webp" />',
      )
      .openOn(map)
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
