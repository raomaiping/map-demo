<template>
  <div class="top-bar">
    <el-button type="primary" @click="startClick">开始</el-button>
    <el-button type="primary" @click="pauseClick">暂停</el-button>
    <el-button type="primary" @click="speetUp">加速</el-button>
    <el-button type="primary" @click="speetDown">减速</el-button>
    <el-button type="primary" @click="stopClick">停止</el-button>
  </div>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import * as geojson from "geojson";
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import "./animated-marker";
import "leaflet-polylinedecorator";
import { ATTRIBUTIONS } from "../../../constants";

let map: L.Map | null = null;
let realRouteLine: L.Polyline<
  geojson.LineString | geojson.MultiLineString,
  any
>; // 实时轨迹线
let newLatlngs;
let animatedMarker;
const initMap = () => {
  //地图容器
  map = L.map("map", {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    center: [39.924317, 116.390619],
    zoom: 12,
    preferCanvas: true, // 使用canvas模式渲染矢量图形
  });
  // 添加底图
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map);
  const latlngs: L.LatLngExpression[] = [
    [39.898457, 116.391844],
    [39.898595, 116.377947],
    [39.898341, 116.368001],
    [39.898063, 116.357144],
    [39.899095, 116.351934],
    [39.905871, 116.35067],
    [39.922329, 116.3498],
    [39.931017, 116.349671],
    [39.939104, 116.349225],
    [39.942233, 116.34991],
    [39.947263, 116.366892],
    [39.947568, 116.387537],
    [39.947764, 116.401988],
    [39.947929, 116.410824],
    [39.947558, 116.42674],
    [39.9397, 116.427338],
    [39.932404, 116.427919],
    [39.923109, 116.428377],
    [39.907094, 116.429583],
    [39.906858, 116.41404],
    [39.906622, 116.405321],
    [39.906324, 116.394954],
    [39.906308, 116.391264],
    [39.916611, 116.390748],
  ];
  const speedList = [
    1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 4, 4, 4, 3, 2, 2, 1, 1, 1,
  ];
  // 轨迹线
  const routeLine = L.polyline(latlngs, {
    weight: 8,
  }).addTo(map);
  // 实时轨迹线
  realRouteLine = L.polyline([], {
    weight: 8,
    color: "#FF9900",
  }).addTo(map);
  // @ts-ignore  轨迹方向箭头
  L.polylineDecorator(routeLine, {
    patterns: [
      {
        repeat: 50,
        // @ts-ignore
        symbol: L.Symbol.arrowHead({
          pixelSize: 5,
          headAngle: 75,
          polygon: false,
          pathOptions: {
            stroke: true,
            weight: 2,
            color: "#FFFFFF",
          },
        }),
      },
    ],
  }).addTo(map);

  const carIcon = L.icon({
    iconSize: [37, 26],
    iconAnchor: [19, 13],
    iconUrl: "/image/car.png",
  });

  // @ts-ignore  动态marker
  animatedMarker = L.animatedMarker(routeLine.getLatLngs(), {
    speedList: speedList,
    interval: 200, // 默认为100mm
    icon: carIcon,
    playCall: updateRealLine,
  }).addTo(map);
  newLatlngs = [routeLine.getLatLngs()[0]];
};

// 绘制已行走轨迹线（橙色那条）
function updateRealLine(latlng) {
  newLatlngs.push(latlng);
  realRouteLine.setLatLngs(newLatlngs);
}

let speetX = 1; // 默认速度倍数
// 加速
function speetUp() {
  speetX = speetX * 2;
  animatedMarker.setSpeetX(speetX);
}

// 减速
function speetDown() {
  speetX = speetX / 2;
  animatedMarker.setSpeetX(speetX);
}

// 开始
function startClick() {
  animatedMarker.start();
}

// 暂停
function pauseClick() {
  animatedMarker.pause();
}

// 停止
function stopClick() {
  newLatlngs = [];
  animatedMarker.stop();
}

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
.top-bar {
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
:deep(img) {
  height: inherit;
}
</style>
