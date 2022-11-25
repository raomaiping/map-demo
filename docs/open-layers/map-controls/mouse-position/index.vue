<template>
  <div id="map">
    <div id="mouse-position" ref="mouse"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, Ref } from "vue";
import { Map, View } from "ol";
import { MousePosition, defaults } from "ol/control";
import { createStringXY } from "ol/coordinate";
import { Tile as TileLayer } from "ol/layer";
import { XYZ } from "ol/source";
import { MAPURL, ATTRIBUTIONS } from "../../../constants";

const raster = new TileLayer({
  source: new XYZ({
    attributions: ATTRIBUTIONS,
    url: MAPURL,
    maxZoom: 20,
  }),
});
const mouse: Ref<HTMLElement | null> = ref(null);

let map: Map | null = null;
//实例化鼠标位置控件（MousePosition）
const mousePositionControl = (target: HTMLElement) =>
  new MousePosition({
    //坐标格式
    coordinateFormat: createStringXY(4),
    //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
    projection: "EPSG:4326",
    //坐标信息显示样式类名，默认是'ol-mouse-position'
    className: "custom-mouse-position",
    //显示鼠标位置信息的目标容器
    target,
    //未定义坐标的标记
    undefinedHTML: "&nbsp;",
  });
const initMap = (mousePositionControl) => {
  map = new Map({
    //初始化map
    target: "map",
    //地图容器中加载的图层
    layers: [
      //加载瓦片图层数据
      raster,
    ],
    view: new View({
      projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3 857
      center: [0, 0],
      //地图初始显示级别
      zoom: 5,
    }),
    //加载控件到地图容器中
    controls: defaults({
      //地图中默认控件
      attributionOptions: {
        //地图数据源信息控件是否可收缩,默认为true
        collapsible: true,
      },
    }).extend([mousePositionControl]), //加载鼠标位置控件
  });
};
onMounted(() => {
  if (mouse.value === null) return;
  initMap(mousePositionControl(mouse.value));
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
  position: relative;
  width: 100%;
  height: 650px;
}

#mouse-position {
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  color: red;
  font-weight: bold;
  z-index: 1;
}
</style>
