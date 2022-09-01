<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import L from "leaflet";
import { ATTRIBUTIONS, FUZHOU } from "/constants";

const initMap = () => {
  // 创建城市标记点
  const fuzhou = L.marker(FUZHOU.reverse()).bindPopup("这是抚州市。");
  const shenzhen = L.marker([22.548857, 114.064839]).bindPopup("这是深圳市。");
  const taibei = L.marker([25.030724, 121.520076]).bindPopup("这是台北市。");
  const hongkong = L.marker([22.27534, 114.16546]).bindPopup("这是香港。");
  // 地图 url
  const mbUrl = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}
?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.
rJcFIG214AriISLbB6B5aw`;

  // 创建覆盖物图层-城市
  const cities = L.layerGroup([fuzhou, shenzhen, taibei, hongkong]);

  // 创建基础图层 - 街道地图
  const streets = L.tileLayer(mbUrl, {
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    attribution: ATTRIBUTIONS,
  });

  // 创建基础图层 - OSM地图
  const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: ATTRIBUTIONS,
  });

  // 创建基础图层组
  const baseLayers = {
    开放式街道地图: osm,
    街道: streets,
  };

  // 创建覆盖物图层组
  const overlays = {
    城市: cities,
  };

  //地图容器
  const map = L.map("map", {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    // 显示中心
    center: [22.548857, 114.064839],
    // 缩放级别
    zoom: 10,
    // 图层组
    layers: [osm, cities],
  });
  // 将图层组添加到图层控件
  const layerControl = L.control.layers(baseLayers, overlays).addTo(map);
  // 梧桐山
  const wts = L.marker([22.572784, 114.200233]).bindPopup(
    "这里是深圳市梧桐山森林公园。"
  );
  // 洪湖
  const hh = L.marker([22.562986, 114.120796]).bindPopup(
    "这里是深圳市洪湖公园。"
  );
  // 创建覆盖物图层-公园
  const parks = L.layerGroup([wts, hh]);
  // 创建基础图层-卫星地图
  const satellite = L.tileLayer(mbUrl, {
    id: "mapbox/satellite-v9",
    tileSize: 512,
    zoomOffset: -1,
    attribution: ATTRIBUTIONS,
  });
  // 将卫星地图添加到基础图层组
  layerControl.addBaseLayer(satellite, "卫星地图");
  // 将公园添加到覆盖物图层组
  layerControl.addOverlay(parks, "公园");

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
  color: #3a3a3a;
}
</style>
