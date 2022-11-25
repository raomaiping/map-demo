<template>
  <div class="top-bar">
    <div style="margin-bottom: 20px">
      矢量图层 Z-index：
      <el-input-number
        v-model="vec"
        :min="-99"
        :max="99"
        @change="changeVectorLayerIndex"
      />
    </div>

    <div>
      影像图层 Z-index：
      <el-input-number
        v-model="img"
        :min="-99"
        :max="99"
        @change="changeImageLayerIndex"
      />
    </div>
  </div>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import L from "leaflet";
import { ATTRIBUTIONS } from "../../../constants";
const vec = ref(1);
const img = ref(1);
// 天地图矢量图层
let vectorLayer: L.TileLayer;
// 天地图影像图层
let imageLayer: L.TileLayer;

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
  //添加天地图矢量图层
  vectorLayer = L.tileLayer(
    "http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",
    {
      noWrap: true,
      attribution: ATTRIBUTIONS,
    }
  ).addTo(map);
  //添加天地图影像图层
  imageLayer = L.tileLayer(
    "http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",
    {
      noWrap: true,
      attribution: ATTRIBUTIONS,
    }
  ).addTo(map);
};
// 改变矢量图层的z-index
const changeVectorLayerIndex = () => {
  //设置图层的ZIndex，上层的ZIndex值比下层的要大
  vectorLayer.setZIndex(vec.value);
};

// 改变影像图层的z-index
const changeImageLayerIndex = () => {
  //设置图层的ZIndex，上层的ZIndex值比下层的要大
  imageLayer.setZIndex(img.value);
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

.top-bar {
  height: 100px;
  text-align: center;
}
</style>
