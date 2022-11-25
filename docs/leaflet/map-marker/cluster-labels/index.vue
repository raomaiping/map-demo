<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import { ATTRIBUTIONS } from "../../../constants";

let map: L.Map | null = null;
let polygon: L.Polygon<any> | null = null;
const initMap = () => {
  //地图容器
  map = L.map("map", {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: [30.5217, 114.3948],
    //当前显示等级
    zoom: 18,
  });

  //加载天地图矢量图层
  L.tileLayer(
    "http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",
    { noWrap: true, attribution: ATTRIBUTIONS }
  ).addTo(map);
  //加载天地图矢量注记图层
  L.tileLayer(
    "http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",
    { noWrap: true, attribution: ATTRIBUTIONS }
  ).addTo(map);

  // @ts-ignore 聚合标注图层
  const markers = L.markerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: false,
  });

  /**添加标注
   */
  function populate() {
    for (let i = 0; i < 100; i++) {
      //生成随机标注
      const maker = L.marker(getRandomLatLng(map));
      //添加标注
      markers.addLayer(maker);
    }
    return false;
  }

  /**将聚合的标注连线
   */
  function getRandomLatLng(map) {
    //获取地图范围
    const bounds = map.getBounds(),
      //获取左下角坐标
      southWest = bounds.getSouthWest(),
      //获取右下角坐标
      northEast = bounds.getNorthEast(),
      //获取地图范围的长
      lngSpan = northEast.lng - southWest.lng,
      //获取地图范围的宽
      latSpan = northEast.lat - southWest.lat;
    return L.latLng(
      //返回任意地图范围内的x坐标
      southWest.lat + latSpan * Math.random(),
      //返回任意地图范围内的y坐标
      southWest.lng + lngSpan * Math.random()
    );
  }

  /**鼠标移动到聚合标注上，将点绘制成多边形
   *  @param {json对象} a 鼠标移动事件参数
   */
  markers.on("clustermouseover", function (a) {
    if (!map) return;
    if (polygon) {
      //移除绘制的多边形
      map.removeLayer(polygon);
      polygon = null;
    }
    //获取点集
    polygon = L.polygon(a.layer.getConvexHull());
    //添加多边形
    map.addLayer(polygon);
  });

  /**鼠标移出取消绘制多边形
   *  @param {json对象} a 鼠标移动事件参数
   */
  markers.on("clustermouseout", function () {
    if (map && polygon) {
      //移除多边形
      map.removeLayer(polygon);
      polygon = null;
    }
  });

  /**Map放大缩小事件
   */
  map.on("zoomend", function () {
    if (map && polygon) {
      //移除多边形
      map.removeLayer(polygon);
      polygon = null;
    }
  });
  //添加随机标注
  populate();
  //添加标注
  map.addLayer(markers);
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
