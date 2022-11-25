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
    // 显示中心
    center: [22.548857, 114.064839],
    // 缩放级别
    zoom: 10,
  });

  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map);

  /**地图移动结束事件
   *  @param {string} type 事件类型（地图移动结束）
   *  @param {function} fn 事件触发后的响应函数
   */
  map.on("moveend", (e) => {
    console.log(e);
    //弹框提示
    alert("地图移动结束！");
  });

  /**地图级数改变事件.该事件触发时也会触发地图移动结束事件
   *  @param {string} type 事件类型（地图级数改变）
   *  @param {function} fn 事件触发后的响应函数
   */
  map.on("zoom", (e) => {
    //弹框提示
    alert("地图级数改变！");
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
