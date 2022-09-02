<template>
  <div class="top-bar">
    <el-button type="primary" @click="addMultiCircle">添加同心圆</el-button>
  </div>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import { ATTRIBUTIONS } from '/constants'
let map = null
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

  // 销毁地图
  onUnmounted(() => {
    map.remove()
  })
}

onMounted(() => {
  initMap()
})

/**添加同心圆
 */
function addMultiCircle() {
  //设置圆心坐标
  const latLng = L.latLng(30.5217, 114.3948)
  //初始半径
  let r = 65
  for (let i = 0; i < 5; i++) {
    //添加圆
    L.circle(latLng, {
      //圆半径
      radius: r,
      //颜色
      color: '#ffcc33',
      //填充色
      fillColor: 'white',
      //填充色透明度
      fillOpacity: 0.8,
    }).addTo(map)
    //调整半径大小
    r = r / 1.5
  }
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
