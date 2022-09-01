<template>
  <div class="top-bar">
    <el-button type="primary" @click="getCurCenter">当前中心</el-button>
    <el-button type="primary" @click="getCurZoom">当前级数</el-button>
    <el-button type="primary" @click="getCurBound">当前地图范围</el-button>
    <el-button type="primary" @click="getMapDivInfo">当前视口范围</el-button>
  </div>
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
    zoomControl: false,
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: [22.548857, 114.064839],
    //最小显示等级
    minZoom: 1,
    //最大显示等级
    maxZoom: 18,
    //当前显示等级
    zoom: 10,
    //限制显示地理范围
    maxBounds: L.latLngBounds(L.latLng(-180, -180), L.latLng(180, 180)),
  })
  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map)
  // 销毁地图
  onUnmounted(() => {
    map.remove()
  })
}

// 获取当前地图中心点
const getCurCenter = () => {
  const center = map.getCenter()
  //弹框显示中心点位置
  ElMessageBox.alert(`经度${center.lng} , 纬度${center.lat}`, '当前视图中心', {
    confirmButtonText: '收到',
  })
}

// 获取当前显示级数
const getCurZoom = () => {
  //获取显示级数
  const zoom = map.getZoom()
  //弹框显示级数大小
  ElMessageBox.alert(`${zoom}级`, '当前显示级数', {
    confirmButtonText: '收到',
  })
}

// 获取当前地图范围
const getCurBound = () => {
  //获取地图视图的经纬度边界
  const ex = map.getBounds()
  const ymin = ex._southWest.lat
  const xmin = ex._southWest.lng
  const ymax = ex._northEast.lat
  const xmax = ex._northEast.lng
  //弹框显示地图范围
  ElMessageBox.alert(
    `<p>经度：${xmin} 至 ${xmax}</p><p>纬度：${ymin} 至 ${ymax}</p>`,
    '当前地图范围：',
    {
      confirmButtonText: '收到',
      dangerouslyUseHTMLString: true,
    },
  )
}

// 获取当前视窗范围
const getMapDivInfo = () => {
  //获取当前地图容器div的大小
  const mapSize = map.getSize()
  //弹框显示视窗范围
  ElMessageBox.alert(`宽${mapSize.x},高${mapSize.y}`, '当前视窗范围', {
    confirmButtonText: '收到',
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
.top-bar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
