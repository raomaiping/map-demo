<template>
  <div class="top-bar">
    <el-button type="primary" @click="startFeatureFlash">开始闪烁</el-button>
    <el-button type="primary" @click="stopFeatureFlash">停止闪烁</el-button>
  </div>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import { ATTRIBUTIONS } from '/constants'
//定义地图
let map
//查询矩形
let geomObj
//查询结果点集
let finaldots = new Array()
//绘制图层
let dispLayer
//计时器返回值
let id
const initMap = () => {
  //地图容器
  map = L.map('map', {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: [30.5217, 114.3948],
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

  //绘制图形
  dispLayer = L.rectangle(
    [
      [30.52172, 114.39359],
      [30.52153, 114.39428],
    ],
    {
      //颜色
      color: 'red',
    },
  ).addTo(map)

  // 销毁地图
  onUnmounted(() => {
    map.remove()
  })
}
/**开始闪烁
 */
function startFeatureFlash() {
  //flag为ture时，图形消失；反之，图形显现
  let flag = true
  //开启计时器
  id = setInterval(function () {
    if (flag) {
      //移除图形
      map.removeLayer(dispLayer)
      flag = false
    } else {
      //添加图形
      map.addLayer(dispLayer)
      flag = true
    }
  }, 1000)
}

/**停止闪烁
 */
function stopFeatureFlash() {
  clearInterval(id)
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
.top-bar {
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
