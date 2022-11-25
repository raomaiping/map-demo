<template>
  <div class="top">
    <img
      v-for="(item, index) in imageList"
      :key="index"
      :src="item"
      draggable="true"
      @dragstart="handleDragStart"
    />
  </div>

  <div id="map" @drop="handleDrop" @dragover="handleDragover">
    <div class="menu" ref="menu">
      <div class="menu-item" @click="handleDelete">删除</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref, onBeforeUnmount } from "vue";
import { Map, View, Overlay, Feature } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { defaults, FullScreen } from "ol/control";
import { XYZ, Vector as VectorSource } from "ol/source";
import { MAPURL, ATTRIBUTIONS } from "../../../constants";
import { defaults as defaultInteractions } from "ol/interaction";
import { Geometry } from "ol/geom";
import { addVectorLabel } from "./tools";
import Drag from "./drag";

let map: Map | null = null,
  menu_overlay: Overlay;
const menu: Ref<HTMLDivElement | null> = ref(null);
const selectIcon: Ref<Feature<Geometry> | null> = ref(null);
const imageList = ["/image/chips.png", "/image/ice_cream.png"];
const raster = new TileLayer({
  source: new XYZ({
    attributions: ATTRIBUTIONS,
    url: MAPURL,
    maxZoom: 20,
  }),
});
//矢量标注的数据源
const vectorSource: VectorSource = new VectorSource();
//矢量标注图层
const vectorLayer = new VectorLayer({
  source: vectorSource,
});
const initMap = () => {
  map = new Map({
    //初始化map
    target: "map",
    //地图容器中加载的图层
    interactions: defaultInteractions().extend([new Drag()]),
    layers: [
      //加载瓦片图层数据
      raster,
      vectorLayer,
    ],
    view: new View({
      projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3 857
      center: [0, 0], // 深圳坐标
      //地图初始显示级别
      zoom: 5,
    }),
    //加载控件到地图容器中
    controls: defaults().extend([
      new FullScreen(), //加载全屏显示控件（目前支持非IE内核浏览器）
    ]),
  });

  menu_overlay = new Overlay({
    element: menu.value || undefined,
    positioning: "center-center",
  });
  map.addOverlay(menu_overlay);
};
const handleDragStart = (event) => {
  const src = event.target.src;
  event.dataTransfer.setData("src", src);
};
const handleDragover = (event: DragEvent) => {
  event.preventDefault();
};
const handleDrop = (event) => {
  if (map === null) return;
  const imageUrl: string = event.dataTransfer?.getData("src");
  const { layerX, layerY }: { layerX: number; layerY: number } = event;
  const coordinate = map.getCoordinateFromPixel([layerX, layerY]);
  addVectorLabel({
    coordinate,
    vectorSource,
    imageUrl,
  });
  event.stopPropagation();
};

//右键函数
/*params: map（创建的map对象）*/
const contextmenu = (map: Map) => {
  map.getViewport().oncontextmenu = function (event) {
    event.preventDefault();
    const pixel = map.getEventPixel(event);
    const feature = map.forEachFeatureAtPixel(pixel, (feature) => feature);
    if (feature) {
      const coordinate = map.getEventCoordinate(event);
      selectIcon.value = feature as Feature<Geometry>;
      menu_overlay.setPosition(coordinate);
    }
  };
};
const handleDelete = () => {
  const source = vectorLayer.getSource();
  if (source === null || selectIcon.value === null) return;
  source.removeFeature(selectIcon.value);
  selectIcon.value = null;
  menu_overlay.setPosition(undefined);
};

onMounted(() => {
  const mapDom = document.getElementById("map");
  //首先禁用document自带的右键功能
  mapDom && (mapDom.oncontextmenu = () => false);
  initMap();
  if (map) {
    contextmenu(map);
    map.on("singleclick", () => {
      menu_overlay.setPosition(undefined);
    });
  }
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
  height: 650px;
}
.top {
  height: 50px;
  text-align: center;
  line-height: 50px;
}
img {
  display: inline-block;
  width: 20px;
  cursor: pointer;
  margin: 0 20px;
}
.menu {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 60px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 99;
  border: 1px solid #ccc;
  border-bottom: none;
}
.menu-item {
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  color: #000;
}
</style>
