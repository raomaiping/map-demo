<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import "leaflet-side-by-side2";
import { ATTRIBUTIONS } from "../../../constants";

let map: L.Map | null = null;
const initMap = () => {
  //地图容器
  map = L.map("map", {
    //地图渲染在canvas上
    preferCanvas: true,
    //参考坐标系
    crs: L.CRS.EPSG3857,
    // 显示中心
    center: [22.548857, 114.064839],
    // 缩放级别
    zoom: 10,
  });
  //天地图矢量图层
  const vecLayer = L.tileLayer(
    "http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",
    { noWrap: true, attribution: ATTRIBUTIONS }
  ).addTo(map);
  //天地图影像图层
  const imgLayer = L.tileLayer(
    "http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",
    { noWrap: true, attribution: ATTRIBUTIONS }
  ).addTo(map);
  // @ts-ignore 添加卷帘控件到地图中
  L.control.sideBySide(vecLayer, imgLayer).addTo(map);
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
  color: #3a3a3a;
}
</style>
