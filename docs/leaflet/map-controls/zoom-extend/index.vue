<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import L from "leaflet";
import { MAPURL, ATTRIBUTIONS } from "/constants";

const initMap = () => {
  //地图容器
  const map = L.map("map", {
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

  //首先，根据实际需求重新定义L.Control.Zoom的参数设置
  L.Control.Zoom = L.Control.extend({
    //属性选择设置
    options: {
      position: "topright", //设置缩放控件的位置
      zoomInText: "大", //设置放大按钮的内容提示
      zoomOutText: "小", //设置缩小按钮的内容提示
      zoomInTitle: "Zoom in",
      zoomOutTitle: "Zoom out",
    },
    //控件返回容器DOM元素，并在相关的映射事件上添加侦听器
    onAdd: function (map) {
      let zoomName = "leaflet-control-zoom",
        container = L.DomUtil.create("div", zoomName + " leaflet-bar"),
        options = this.options;
      this._zoomInButton = this._createButton(
        options.zoomInText,
        options.zoomInTitle,
        zoomName + "-in",
        container,
        this._zoomIn
      );
      this._zoomOutButton = this._createButton(
        options.zoomOutText,
        options.zoomOutTitle,
        zoomName + "-out",
        container,
        this._zoomOut
      );
      return container;
    },
    //放大方法
    _zoomIn: function (e) {
      if (!this._disabled) {
        //zoomIn是leaflet的map地图实现放大的关键方法
        this._map.zoomIn(e.shiftKey ? 3 : 1);
      }
    },
    //缩小方法
    _zoomOut: function (e) {
      if (!this._disabled) {
        //zoomOut是leaflet的map地图实现缩小的关键方法
        this._map.zoomOut(e.shiftKey ? 3 : 1);
      }
    },
    //创建按钮
    _createButton: function (html, title, className, container, fn) {
      const link = L.DomUtil.create("a", className, container);
      link.innerHTML = html;
      link.href = "#";
      link.title = title;
      L.DomEvent.on(link, "mousedown dblclick", L.DomEvent.stopPropagation)
        .on(link, "click", L.DomEvent.stop)
        .on(link, "click", fn, this)
        .on(link, "click", this._refocusOnMap, this);
      return link;
    },
  });
  //然后，重新定义L.control.zoom控件
  L.control.zoomExtend = function (options) {
    return new L.Control.Zoom(options);
  };
  //最后，将新定义的控件添加到地图容器中
  L.control.zoomExtend().addTo(map);
  // 销毁地图
  onUnmounted(() => {
    map.remove();
  });
};
onMounted(() => {
  initMap();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
}
</style>
