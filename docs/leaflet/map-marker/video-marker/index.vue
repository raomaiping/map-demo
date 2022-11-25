<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import { ATTRIBUTIONS } from "../../../constants";

let map: L.Map | null = null;
const initMap = () => {
  //定义视频图层
  let videolayer: L.VideoOverlay | null;
  //视频文件路径
  const videoUrl = "https://www.mapbox.com/bites/00188/patricia_nasa.webm";
  //视频添加的地图范围
  const videoBounds: [[number, number], [number, number]] = [
    [30.5207, 114.3938],
    [30.5227, 114.3958],
  ];
  //地图容器
  map = L.map("map", {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: [30.5217, 114.3948],
    //最小显示等级
    minZoom: 1,
    //最大显示等级
    maxZoom: 18,
    //当前显示等级
    zoom: 18,
    //取消鼠标双击缩放
    doubleClickZoom: false,
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
  //添加播放图标
  const playIcon = L.icon({
    //图标地址
    iconUrl: "/image/play.png",
    //图标大小
    iconSize: [70, 70],
  });
  //添加图片标注（播放）
  const playMarker = L.marker([30.5217, 114.3948], {
    //添加图标
    icon: playIcon,
  }).addTo(map);
  //添加取消播放图标
  const stopIcon = L.icon({
    //图标地址
    iconUrl: "/image/stop-playing.png",
    //图标大小
    iconSize: [40, 40],
  });
  //添加图片标注（取消播放）
  const stopMarker = L.marker([30.5217, 114.3948], {
    //添加图标
    icon: stopIcon,
  });

  /**鼠标单击事件
   *  @param {string} type 事件类型（鼠标单击）
   *  @param {function} fn 事件触发后的响应函数
   */
  playMarker.on("click", function () {
    if (!map) return;
    //添加视频图层至地图中显示
    videolayer = L.videoOverlay(videoUrl, videoBounds);
    map.addLayer(videolayer);
    //移除播放标注
    map.removeLayer(playMarker);
    //添加取消播放标注
    map.addLayer(stopMarker);
  });

  /**鼠标单击事件
   *  @param {string} type 事件类型（鼠标单击）
   *  @param {function} fn 事件触发后的响应函数
   */
  stopMarker.on("click", function () {
    if (!map || !videolayer) return;
    //将地图中的视频图层移除
    map.removeLayer(videolayer);
    //移除取消播放标注
    map.removeLayer(stopMarker);
    //添加播放标注
    map.addLayer(playMarker);
    videolayer = null;
  });
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
:deep(video) {
  max-width: initial;
}
</style>
