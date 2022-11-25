<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import { ElMessageBox } from "element-plus";
import { ATTRIBUTIONS } from "../../../constants";

let map: L.Map | null = null;
const initMap = () => {
  //地图容器
  map = L.map("map", {
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
  //设置图层组
  const vector = L.layerGroup([vecLayer, cvaLayer]);
  const image = L.layerGroup([imgLayer, ciaLayer]);
  const baseLayers = {
    矢量: vector,
    影像: image,
  };
  //初始时加载矢量图层组
  map.addLayer(vector);
  //添加图层组控件
  L.control.layers(baseLayers).addTo(map);

  /**注册基图层改变事件，通过layers控件来触发
   *  @param {string} type 事件类型（底图改变）
   *  @param {function} fn 事件触发后的响应函数
   */
  map.on("baselayerchange", (e) => {
    //弹框提示
    ElMessageBox.alert(`当前图层已切换为${e.name}图层`, "图层操作事件触发了", {
      confirmButtonText: "收到",
    });
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
