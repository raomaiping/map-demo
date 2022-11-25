<template>
  <div class="top-bar">
    <el-button type="primary" @click="addRectGrid"> 添加矩形网格 </el-button>
  </div>
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
    center: [30.5217, 114.3948],
    //当前显示等级
    zoom: 18,
  });

  //加载天地图矢量图层
  L.tileLayer(
    "http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",
    { noWrap: true, attribution: ATTRIBUTIONS }
  ).addTo(map);
  //加载天地图矢量注记图层
  L.tileLayer(
    "http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",
    { noWrap: true, attribution: ATTRIBUTIONS }
  ).addTo(map);
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

/**添加矩形网格
 */
function addRectGrid() {
  if (!map) return;
  //绘制经线
  for (let i = 0; i < 11; i++) {
    L.polyline(
      [
        [30.5207, 114.3938 + i * 0.0002],
        [30.5227, 114.3938 + i * 0.0002],
      ],
      { color: "red" }
    ).addTo(map);
  }
  //绘制纬线
  for (let j = 0; j < 11; j++) {
    L.polyline(
      [
        [30.5207 + j * 0.0002, 114.3938],
        [30.5207 + j * 0.0002, 114.3958],
      ],
      { color: "red" }
    ).addTo(map);
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
