<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import { MAPURL, ATTRIBUTIONS } from "../../../constants";

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

  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map);

  // 绘制几何图形
  drawGraphic(map);
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
/**绘制几何图形
 */
function drawGraphic(map: L.Map) {
  //绘制点
  L.circle([30.52181, 114.39518], {
    //点半径
    radius: 5,
    //颜色
    color: "red",
    //透明度
    fillOpacity: 1,
  }).addTo(map);
  //绘制线
  L.polyline(
    [
      [30.52247, 114.39332],
      [30.5209, 114.39332],
    ],
    {
      //线颜色
      color: "blue",
    }
  ).addTo(map);
  //绘制圆
  L.circle([30.52094, 114.39445], {
    //圆半径
    radius: 10,
    //颜色
    color: "#ffcc33",
    //填充色
    fillColor: "white",
    //填充色透明度
    fillOpacity: 0.8,
  }).addTo(map);
  //绘制矩形
  L.rectangle(
    [
      [30.52172, 114.39359],
      [30.52153, 114.39428],
    ],
    {
      //颜色
      color: "#ff7800",
      //线宽
      weight: 1,
      //填充色透明度
      fillOpacity: 0.5,
    }
  ).addTo(map);
  //绘制多边形
  L.polygon(
    [
      [30.52263, 114.39445],
      [30.52215, 114.39406],
      [30.52215, 114.39477],
    ],
    {
      //颜色
      color: "red",
    }
  ).addTo(map);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
  color: #3a3a3a;
}
</style>
