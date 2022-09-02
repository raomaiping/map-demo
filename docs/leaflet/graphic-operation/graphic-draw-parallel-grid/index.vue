<template>
  <div class="top-bar">
    <el-button type="primary" @click="addParallelGrid">
      添加平行四边形网格
    </el-button>
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

/**添加平行四边形网格
 */
function addParallelGrid() {
  //绘制经线，倾斜
  for (let i = 0; i < 9; i++) {
    L.polyline(
      [
        [30.5207, 114.3938 + i * 0.0005],
        [30.5227, 114.3938 + (i + 1) * 0.0005],
      ],
      { color: 'red' },
    ).addTo(map)
  }
  //绘制纬线,水平
  for (let j = 0; j < 9; j++) {
    L.polyline(
      [
        [30.5207 + j * 0.00025, 114.3938 + (j * 0.0005) / 8],
        [30.5207 + j * 0.00025, 114.3978 + (j * 0.0005) / 8],
      ],
      { color: 'red' },
    ).addTo(map)
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
