<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import "leaflet-nav";
import { MAPURL, ATTRIBUTIONS } from "../../../constants";

let map: L.Map | null = null;
const initMap = () => {
  //地图容器
  map = L.map("map", {
    zoomControl: false,
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: [22.548857, 114.064839],
    //最小显示等级
    minZoom: 1,
    //最大显示等级
    maxZoom: 18,
    //当前显示等级
    zoom: 10,
    //限制显示地理范围
    maxBounds: L.latLngBounds(L.latLng(-180, -180), L.latLng(180, 180)),
  });

  //加载图层
  L.tileLayer(MAPURL, {
    noWrap: true,
    attribution: ATTRIBUTIONS,
  }).addTo(map);

  // 定义导航控件，并添加到地图容器中
  L.control
    // @ts-ignore
    .navbar({
      forwardTitle: "前进",
      backTitle: "后退",
      homeTitle: "回到地图初始位置",
    })
    .addTo(map);
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
:deep(.leaflet-control-navbar-fwd) {
  background-image: url("/image/arrow-right_000000_14.png");
}

:deep(.leaflet-control-navbar-back) {
  background-image: url("/image/arrow-left_000000_14.png");
}

:deep(.leaflet-control-navbar-home) {
  background-image: url("/image/home_000000_14.png");
}

:deep(.leaflet-control-navbar-fwd-disabled) {
  background-image: url("/image/arrow-right_bbbbbb_14.png");
}

:deep(.leaflet-control-navbar-back-disabled) {
  background-image: url("/image/arrow-left_bbbbbb_14.png");
}

:deep(.leaflet-control-navbar-home-disabled) {
  background-image: url("/image/home_bbbbbb_14.png");
}
</style>
