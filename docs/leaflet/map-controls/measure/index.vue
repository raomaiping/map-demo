<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import L from "leaflet";
import "leaflet-measure/dist/leaflet-measure.cn";
import "leaflet-measure/dist/leaflet-measure.css";
import { MAPURL, ATTRIBUTIONS } from "/constants";

const initMap = () => {
  //地图容器
  const map = L.map("map", {
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
    // 加载测量控件
    measureControl: true,
  });
  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map);

  // 销毁地图
  onUnmounted(() => {
    map.remove();
  });
};
onMounted(() => {
  initMap();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
}
:deep(.leaflet-control-measure) {
  color: #3a3a3a;
}
</style>
