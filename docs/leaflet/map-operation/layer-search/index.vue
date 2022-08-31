<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive } from 'vue'
import L from 'leaflet'
import 'leaflet.magnifyingglass/leaflet.magnifyingglass'
import 'leaflet.magnifyingglass/leaflet.magnifyingglass.css'
import { ATTRIBUTIONS, SHENZHEN, FUZHOU } from '/constants'
const form = reactive({
  longitude: FUZHOU[0],
  latitude: FUZHOU[1],
})
let map = null
const position = SHENZHEN.reverse()
const initMap = () => {
  //地图容器
  map = L.map('map', {
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
  //创建天地图影像图层
  const imgLayer = L.tileLayer(
    'http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610',
    { noWrap: true, attribution: ATTRIBUTIONS },
  )
  //添加放大镜
  L.magnifyingGlass({
    //设置放大镜中显示的图层
    layers: [imgLayer],
    //探查半径
    radius: 100,
    //设置放大镜中图层级数和主图层的级数差（0表示同级）
    zoomOffset: 0,
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
