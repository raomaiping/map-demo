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

  //绘制线
  const polyline = L.polyline(
    [
      [30.52247, 114.39332],
      [30.5209, 114.39332],
    ],
    {
      weight: 6,
      color: "red",
    }
  ).addTo(map);

  //绘制矩形
  const rectangle = L.rectangle(
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

  //添加矢量图形标注
  /**鼠标单击事件
   *  @param {string} type 事件类型（地图单击）
   *  @param {function} fn 事件触发后的响应函数
   */
  polyline.on("click", function (e) {
    if (!map) return;
    //在鼠标点击位置添加Popup标注
    L.popup().setContent("鼠标点击了线").setLatLng(e.latlng).openOn(map);
  });
  rectangle.on("click", function (e) {
    if (!map) return;
    //在鼠标点击位置添加Popup标注
    L.popup().setContent("鼠标点击了矩形").setLatLng(e.latlng).openOn(map);
  });

  /**鼠标悬浮事件
   *  @param {string} type 事件类型（地图单击）
   *  @param {function} fn 事件触发后的响应函数
   */
  polyline.on("mouseover", function (e) {
    if (!map) return;
    //在鼠标悬浮位置添加Popup标注
    L.popup().setContent("鼠标在线上悬浮").setLatLng(e.latlng).openOn(map);
  });
  rectangle.on("mouseover", function (e) {
    if (!map) return;
    //在鼠标悬浮位置添加Popup标注
    L.popup().setContent("鼠标在矩形上悬浮").setLatLng(e.latlng).openOn(map);
  });
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
