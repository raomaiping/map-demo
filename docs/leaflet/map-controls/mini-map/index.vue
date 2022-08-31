<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import MiniMap from 'leaflet-minimap'
import { ATTRIBUTIONS, SHENZHEN } from '/constants'

const initMap = () => {
  const position = SHENZHEN.reverse()
  //地图容器
  const map = L.map('map', {
    zoomControl: false,
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: position,
    //最小显示等级
    minZoom: 1,
    //最大显示等级
    maxZoom: 18,
    //当前显示等级
    zoom: 10,
    //限制显示地理范围
    maxBounds: L.latLngBounds(L.latLng(-180, -180), L.latLng(180, 180)),
  })

  //加载天地图矢量图层
  L.tileLayer(
    'http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610',
    { noWrap: true, attribution: ATTRIBUTIONS },
  ).addTo(map)
  //加载天地图矢量注记图层
  L.tileLayer(
    'http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610',
    { noWrap: true, attribution: ATTRIBUTIONS },
  ).addTo(map)
  //定义鹰眼图层（用于加载到鹰眼控件中）
  const minmapLayer = new L.TileLayer(
    'http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610',
    {
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 18,
      //设置地图不连续显示
      noWrap: true,
    },
  )
  //创建鹰眼控件
  const miniMap = new MiniMap(minmapLayer, { toggleDisplay: true })
  //加载鹰眼控件
  map.addControl(miniMap)
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
