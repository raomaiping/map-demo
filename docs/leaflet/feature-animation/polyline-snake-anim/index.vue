<template>
  <div class="top-bar">
    <el-button type="primary" @click="startSnake"> 开启水流模拟 </el-button>
  </div>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import * as geojson from "geojson";
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import "leaflet.polyline.snakeanim";
import route from "./route";
import { ATTRIBUTIONS } from "../../../constants";

//水流路径
let path: L.Polyline<geojson.LineString | geojson.MultiLineString, any>;
//定义地图
let map: L.Map | null = null;

const initMap = () => {
  //地图容器
  map = L.map("map", {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: [30.53, 114.3],
    //当前显示等级
    zoom: 4,
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

  //线坐标数组
  const latlngs: L.LatLng[] = new Array();
  //获取线数据
  const len = route.length;
  for (let i = 0; i < len; i++) {
    latlngs.push(new L.LatLng(route[i][0], route[i][1]));
  }
  // @ts-ignore 创建线图层
  path = L.polyline(latlngs, { snakingSpeed: 30 });
  //在起点处添加一个标注
  map.addLayer(L.marker(latlngs[0]));
  //在终点处添加一个标注
  map.addLayer(L.marker(latlngs[len - 1]));
};
/**开启水流模拟
 */
function startSnake() {
  if (!map) return;
  //将线图层添加至地图中
  map.addLayer(path);
  // @ts-ignore 启动模拟
  path.snakeIn();
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
</style>
