<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { defaults, Control } from "ol/control";
import { XYZ } from "ol/source";
import { MAPURL, ATTRIBUTIONS } from "../../../constants";
interface options {
  target: string | HTMLElement;
  [propName: string]: any;
}

class RotateNorthControl extends Control {
  constructor(options: options) {
    const button = document.createElement("button");
    button.innerHTML = "N";

    const element = document.createElement("div");
    element.className = "rotate-north ol-unselectable ol-control";
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener("click", this.handleRotateNorth.bind(this), false);
  }

  handleRotateNorth() {
    const map = this.getMap();
    if (map) {
      map.getView().setRotation(0);
    }
  }
}
const raster = new TileLayer({
  source: new XYZ({
    attributions: ATTRIBUTIONS,
    url: MAPURL,
    maxZoom: 20,
  }),
});
let map: Map | null = null;
const initMap = () => {
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
      rotation: 1,
    }),
    //加载控件到地图容器中
    controls: defaults().extend([
      new RotateNorthControl({ target: "map" }), // 加载自定义控件
    ]),
  });
};

onMounted(() => {
  initMap();
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

:deep(.rotate-north) {
  top: 65px;
  left: 0.5em;
}

:deep(.ol-touch .rotate-north) {
  top: 80px;
}
</style>
