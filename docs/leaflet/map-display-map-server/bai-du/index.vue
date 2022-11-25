<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import "./tileLayer.baidu";

let map: L.Map | null = null;
const initMap = () => {
  //地图容器
  map = L.map("map", {
    // @ts-ignore 参考坐标系
    crs: L.CRS.BAIDU,
    //显示中心
    center: [22.548857, 114.064839],
    //最小显示等级
    minZoom: 1,
    //最大显示等级
    maxZoom: 18,
    //当前显示等级
    zoom: 12,
  });
  // @ts-ignore  加载百度地图
  L.tileLayer.baidu({ layer: "vec" }).addTo(map);
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
