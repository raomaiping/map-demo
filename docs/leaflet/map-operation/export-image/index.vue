<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import "leaflet.browser.print/dist/leaflet.browser.print";
import domtoimage from "dom-to-image";
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
    crossOrigin: "anonymous",
  }).addTo(map);
  const saveAsImage = function () {
    const print = document.getElementById("map-print");
    if (!print) return;
    return domtoimage.toPng(print, {}).then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = "地图.png";
      link.href = dataUrl;
      link.click();
    });
  };
  // 加载导出图片控件
  L.control
    // @ts-ignore
    .browserPrint({
      title: "导出PNG地图",
      // @ts-ignore
      printModes: [L.BrowserPrint.Mode.Auto("Download PNG")],
      printFunction: saveAsImage,
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
  color: #3a3a3a;
}
</style>
