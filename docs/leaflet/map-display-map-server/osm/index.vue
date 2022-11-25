<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import { ATTRIBUTIONS } from "../../../constants";

let map: L.Map | null = null;
const initMap = () => {
  //地图容器
  map = L.map("map", {
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
  });
  //定义OSM地图，并加载到地图容器中
  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //最小显示等级
    minZoom: 1,
    //最大显示等级
    maxZoom: 18,
    //设置地图不连续显示
    noWrap: true,
    //设置版权
    attribution: ATTRIBUTIONS,
  }).addTo(map);
};

onMounted(() => {
  initMap();
});

// 销毁地图
onBeforeUnmount(() => {
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
}
</style>
