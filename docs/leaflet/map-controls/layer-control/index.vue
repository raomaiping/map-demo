<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import L from "leaflet";
import { ATTRIBUTIONS } from "/constants";

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
    zoom: 18,
    //限制显示地理范围
    maxBounds: L.latLngBounds(L.latLng(-180, -180), L.latLng(180, 180)),
  });

  //天地图矢量图层
  const vecLayer = L.tileLayer(
    "http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",
    { noWrap: true, attribution: ATTRIBUTIONS }
  );
  //天地图矢量注记图层
  const cvaLayer = L.tileLayer(
    "http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",
    { noWrap: true, attribution: ATTRIBUTIONS }
  );
  //天地图影像图层
  const imgLayer = L.tileLayer(
    "http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",
    { noWrap: true, attribution: ATTRIBUTIONS }
  );
  //天地图影像注记图层
  const ciaLayer = L.tileLayer(
    "http://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",
    { noWrap: true, attribution: ATTRIBUTIONS }
  );
  //矢量图层组
  const vecLayerGroup = L.layerGroup([vecLayer, cvaLayer]);
  //影像图层组
  const imgLayerGroup = L.layerGroup([imgLayer, ciaLayer]);
  //设置图层组
  const baseLayers = {
    天地图矢量: vecLayerGroup,
    天地图影像: imgLayerGroup,
  };
  //初始时加载矢量图层组
  map.addLayer(vecLayerGroup);
  //添加图层组控件
  L.control.layers(baseLayers).addTo(map);
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
</style>
