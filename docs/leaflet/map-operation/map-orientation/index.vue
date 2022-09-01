<template>
  <el-form :inline="true" :model="form" class="top-bar">
    <el-form-item label="经度">
      <el-input v-model="form.longitude" style="100px" />
    </el-form-item>
    <el-form-item label="纬度">
      <el-input v-model="form.latitude" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onMoveto">平移</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onRestore">复位</el-button>
    </el-form-item>
  </el-form>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive } from "vue";
import L from "leaflet";
import { ElMessage } from "element-plus";
import { MAPURL, ATTRIBUTIONS, FUZHOU } from "/constants";
const form = reactive({
  longitude: FUZHOU[0],
  latitude: FUZHOU[1],
});
let map = null;
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
  // 销毁地图
  onUnmounted(() => {
    map.remove();
  });
};

// 平移到抚州
const onMoveto = () => {
  //获取文本框中输入的经度坐标和纬度坐标
  const { longitude, latitude } = form;
  if (!longitude || !latitude) {
    ElMessage({
      message: "请输入经度和纬度坐标",
      type: "error",
    });
  }
  //注意leaflet是用纬经度来表示位置
  const coordinate = [+latitude, +longitude];
  //平移视图位置，并设置显示级数
  map.setView(coordinate, map.getZoom());
};

// 复位到深圳
const onRestore = () => {
  //将地图恢复至初始位置状态
  map.setView(position, 10);
};
onMounted(() => {
  initMap();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
  color: #3a3a3a;
}
.el-form--inline .el-form-item {
  margin-right: 25px;
}
</style>
