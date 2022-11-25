<template>
  <div id="map">
    <el-card id="geometry-info">
      <p>几何图形类型：{{ geometryType }}</p>
      <p>图形几何信息如下：</p>
      <p v-html="geometryInfo"></p>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, Ref } from "vue";
import L from "leaflet";
import "leaflet-draw";
import "./leaflet.draw-cn";
import "leaflet-draw/dist/leaflet.draw.css";
import { ATTRIBUTIONS } from "../../../constants";

const geometryType: Ref<string> = ref("");
const geometryInfo: Ref<string> = ref("");
let map: L.Map | null = null;
const initMap = () => {
  (window as any).type = true; // 修复 leaflet-draw 绘制矩形 的报错  type is not defined
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

  //添加绘制图层
  const drawnItems = new L.FeatureGroup().addTo(map);
  // @ts-ignore 添加绘制控件
  const drawControl = new L.Control.Draw({
    edit: {
      //绘制图层
      featureGroup: drawnItems,
    },
  });
  //添加绘制控件
  map.addControl(drawControl);
  // @ts-ignore
  map.on(L.Draw.Event.CREATED, (e) => {
    // @ts-ignore 获取绘制图形类型
    const type: string = e.layerType;
    //获取绘制图层
    const drawlayer = e.layer;
    if (type === "marker") {
      //显示Popup
      drawlayer.bindPopup("hello world!");
    }
    //显示图层
    drawnItems.addLayer(drawlayer);

    // 显示几何信息
    showGeometryInfo(type, drawlayer);
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

function showGeometryInfo(type: string, drawlayer) {
  // 创建几何信息
  const createGeometryInfo = (latlng) => {
    //几何信息字符串
    let latlngsStr = "";
    latlng.forEach((item) => {
      const { lat, lng } = item;
      latlngsStr += `<font>${lat},${lng}</font><br>`;
    });
    return latlngsStr;
  };
  const _latlng = drawlayer._latlngs?.[0] || [];
  //获取线几何信息
  if (type == "polyline" && drawlayer.editing.latlngs[0].length) {
    geometryType.value = "线";
    geometryInfo.value = createGeometryInfo(drawlayer.editing.latlngs[0]);
  }

  //获取多边形几何信息
  if (type == "polygon" && _latlng.length > 0) {
    geometryType.value = "多边形";
    geometryInfo.value = createGeometryInfo(_latlng);
  }

  //获取矩形几何信息
  if (type == "rectangle" && _latlng.length > 0) {
    geometryType.value = "矩形";
    geometryInfo.value = createGeometryInfo(_latlng);
  }

  //获取圆几何信息
  if (type == "circle" && drawlayer._radius > 0) {
    geometryType.value = "圆";
    geometryInfo.value = `
    <font>圆心坐标：<br>${drawlayer._latlng.lat},${drawlayer._latlng.lng}<font></br>
    <font>半径：${drawlayer._radius}</font>`;
  }

  //获取标记几何信息
  if (type == "marker") {
    geometryType.value = "标注";
    geometryInfo.value = `<font>${drawlayer._latlng.lat},${drawlayer._latlng.lng}</font>`;
  }

  //获取圆标记几何信息
  if (type == "circlemarker") {
    geometryType.value = "圆形标注";
    geometryInfo.value = `<font>${drawlayer._latlng.lat},${drawlayer._latlng.lng}</font>`;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  position: relative;
  height: 650px;
  color: #3a3a3a;
}
.top-bar {
  height: 50px;
  line-height: 30px;
  text-align: center;
}

#geometry-info {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 300px;
  width: 350px;
  z-index: 999;
  overflow: auto;
}
</style>
