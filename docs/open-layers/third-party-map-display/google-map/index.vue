<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { onMounted, onBeforeUnmount } from "vue";
import { XYZ } from "ol/source";
import { ATTRIBUTIONS } from "../../../constants";

const raster = new TileLayer({
  source: new XYZ({
    attributions: ATTRIBUTIONS,
    url: "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
    maxZoom: 20,
  }),
});
let map: Map | null = null;
onMounted(() => {
  map = new Map({
    //地图容器div的ID
    target: "map",
    //地图容器中加载的图层
    layers: [
      //加载瓦片图层数据
      raster,
    ],
    //地图视图设置
    view: new View({
      //地图初始中心点
      center: [0, 0],
      //地图初始显示级别
      zoom: 2,
    }),
  });
});

onBeforeUnmount(() => {
  if (map) {
    map.dispose();
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
