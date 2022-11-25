<template>
  <div class="top-bar">
    <el-button type="primary" @click="addMultiRect">
      添加多个中心对称多边形
    </el-button>
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

/**添加多个中心对称多边形
 */
function addMultiRect() {
  if (!map) return;
  for (let i = 0; i < 8; i++) {
    //设置矩形的坐标范围
    const bounds: [[number, number], [number, number]] = [
      [30.5207 + i * 0.000125, 114.3938 + i * 0.000125],
      [30.5227 - i * 0.000125, 114.3958 - i * 0.000125],
    ];
    //将创建的矩形添加进图层
    L.rectangle(bounds, {
      //边线颜色
      color: "#ff7800",
      //线宽
      weight: 3,
      //填充色
      fillColor: "white",
      //透明度
      fillOpacity: 0,
    }).addTo(map);
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
