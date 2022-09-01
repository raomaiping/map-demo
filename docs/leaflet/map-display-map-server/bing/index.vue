<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import L from "leaflet";
import "leaflet-bing-layer";

const initMap = () => {
  //地图容器
  const map = L.map("map", {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: [22.548857, 114.064839],
    //最小显示等级
    minZoom: 1,
    //最大显示等级
    maxZoom: 18,
    //当前显示等级
    zoom: 12,
    //不添加属性说明控件
    attributionControl: false,
  });
  //设置bing地图的key
  const BING_KEY =
    "Q57tupj2UBsQNQdju4xL~xBceblfTd6icjljunbuaCw~AhwA-whmGMsfIpVhslZyknWhFYq-GvWJZqBnqV8Zq1uRlI5YM_qr7_hxvdgnU7nH";
  //加载Bing地图
  L.tileLayer.bing(BING_KEY).addTo(map);
  // 销毁地图
  onUnmounted(() => {
    map.remove();
  });
};
onMounted(() => {
  initMap();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
}
</style>
