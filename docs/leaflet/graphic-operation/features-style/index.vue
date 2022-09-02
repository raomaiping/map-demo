<template>
  <div class="top-bar">
    <el-button type="primary" @click="setLineStyle">修改线样式</el-button>
    <el-button type="primary" @click="setPolygonStyle">修改矩形样式</el-button>
  </div>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import { ATTRIBUTIONS } from '/constants'
//绘制图层
const drawnItems = new L.FeatureGroup()
const initMap = () => {
  //地图容器
  const map = L.map('map', {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: [30.5217, 114.3948],
    //不允许地图拖拽
    dragging: false,
    //当前显示等级
    zoom: 18,
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

  //绘制线
  L.polyline(
    [
      [30.52247, 114.39332],
      [30.5209, 114.39332],
    ],
    {
      //线颜色
      color: 'blue',
    },
  ).addTo(drawnItems)

  //绘制矩形
  L.rectangle(
    [
      [30.52172, 114.39359],
      [30.52153, 114.39428],
    ],
    {
      //颜色
      color: 'red',
    },
  ).addTo(drawnItems)

  //添加绘制图层
  map.addLayer(drawnItems)

  // 销毁地图
  onUnmounted(() => {
    map.remove()
  })
}

/**修改线图形的样式
 */
const setLineStyle = () => {
  //获取颜色
  const color = getRandomColor()
  //修改样式
  drawnItems.getLayers()[0].setStyle({ color: color })
}
/**修改矩形图形的样式
 */
const setPolygonStyle = () => {
  //获取颜色
  const color = getRandomColor()
  //修改样式
  drawnItems.getLayers()[1].setStyle({ color: color })
}

onMounted(() => {
  initMap()
})

/**生成随机颜色
 */
function getRandomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
  color: #3a3a3a;
}
.top-bar {
  height: 50px;
  line-height: 30px;
  text-align: center;
}
</style>
