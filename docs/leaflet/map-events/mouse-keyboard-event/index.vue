<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import { ElMessageBox } from "element-plus";
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
  }).addTo(map);

  /**地图单击事件
   *  @param {string} type 事件类型（地图单击）
   *  @param {function} fn 事件触发后的响应函数
   */
  map.on("click", (e) => {
    //弹框提示点击位置的坐标
    ElMessageBox.alert(
      `点击位置为<p>经度：${e.latlng.lng}</p><p>纬度：${e.latlng.lat}</p>`,
      "地图被单击了！",
      {
        confirmButtonText: "收到",
        dangerouslyUseHTMLString: true,
      }
    );
  });

  /**键盘按下事件
   *  @param {string} type 事件类型（键盘按下）
   *  @param {function} fn 事件触发后的响应函数
   */
  map.on("keypress", (e) => {
    //弹框提示输入的值
    ElMessageBox.alert(`${e.originalEvent.key}键被按下了`, "按下了键盘!", {
      confirmButtonText: "收到",
    });
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
</style>
