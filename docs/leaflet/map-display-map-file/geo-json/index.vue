<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import { MAPURL, ATTRIBUTIONS } from '/constants'

//创建GeoJSON数据
const data = [
  {
    type: 'Feature',
    properties: { party: 'Republican', name: '三角形' },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [114.39386, 30.52254],
          [114.39344, 30.52178],
          [114.39437, 30.52178],
        ],
      ],
    },
  },
  {
    type: 'Feature',
    properties: { party: 'Democrat', name: '矩形' },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [114.39466, 30.52254],
          [114.3956, 30.52254],
          [114.3956, 30.52178],
          [114.39466, 30.52178],
        ],
      ],
    },
  },
]

const initMap = () => {
  //地图容器
  const map = L.map('map', {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: [30.5217, 114.3948],
    //最小显示等级
    minZoom: 1,
    //最大显示等级
    maxZoom: 18,
    //当前显示等级
    zoom: 18,
  })
  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map)

  //添加GeoJSON数据，在地图中显示
  L.geoJSON(data, {
    style: (feature) => {
      //设置数据的颜色
      const colorObj = {
        Republican: { color: '#ff0000' },
        Democrat: { color: '#0000ff' },
      }
      return colorObj[feature.properties.party]
    },
  }) //设置鼠标悬浮事件
    .on('mouseover', (e) => {
      //解析选中数据的类型名
      const type = e.layer.feature.properties.name
      //在鼠标悬浮位置添加Popup标注
      L.popup().setContent(type).setLatLng(e.latlng).openOn(map)
    })
    .addTo(map)
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
