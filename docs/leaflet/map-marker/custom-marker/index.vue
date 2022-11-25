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
    center: [22.548857, 114.064839],
    //当前显示等级
    zoom: 10,
  });

  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map);
  //添加自定义图标
  const icon = L.icon({
    //图标地址
    iconUrl: "/image/leaf-green.png",
    //图标阴影地址
    shadowUrl: "/image/leaf-shadow.png",
    iconSize: [38, 95], //图标大小
    shadowSize: [50, 64], // 阴影的大小
    iconAnchor: [22, 94], // 与标记位置相对应的图标点
    shadowAnchor: [4, 62], // 对影子也是一样
    popupAnchor: [-3, -76], // 相对于图标锚点，从哪个点弹出应该打开
  });
  //添加自定义标注
  L.marker([22.548857, 114.064839], {
    //设置图标
    icon: icon,
  }).addTo(map);
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
