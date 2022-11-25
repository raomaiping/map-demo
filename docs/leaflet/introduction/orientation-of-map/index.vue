<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import { MAPURL, ATTRIBUTIONS } from "../../../constants";

let map: L.Map | null;
const initMap = () => {
  //地图容器
  map = L.map("map").setView([22.548857, 114.064839], 10);

  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map);

  // 定位Geolocation
  map.locate({
    setView: true,
    maxZoom: 18,
  });
  //注册定位成功事件
  map.on("locationfound", (e) => {
    if (map === null) return;
    const radius = e.accuracy / 2;
    L.marker(e.latlng).addTo(map).bindPopup("你就在这个圈内");
    L.circle(e.latlng, radius).addTo(map);
  });
  //注册定位失败事件
  map.on("locationerror", (e) => {
    console.log("定位出错=====>", e);
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
}
</style>
