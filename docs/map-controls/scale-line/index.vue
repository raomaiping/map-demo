<template>
    <div id="map"></div>
</template>

<script setup>
import "ol/ol.css";
import { onMounted } from "vue";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { ScaleLine, defaults } from "ol/control";
import { XYZ } from "ol/source";
import { MAPURL, ATTRIBUTIONS } from "../../constants";

const raster = new TileLayer({
    source: new XYZ({
        attributions: ATTRIBUTIONS,
        url: MAPURL,
        maxZoom: 20,
    }),
});

//实例化比例尺控件（ScaleLine）
const scaleLineControl = new ScaleLine({
    //设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
    units: "metric",
});
const initMap = () => {
    const map = new Map({
        //初始化map
        target: "map",
        //地图容器中加载的图层
        layers: [
            //加载瓦片图层数据
            raster,
        ],
        view: new View({
            projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3 857
            center: [0, 0], // 深圳坐标
            //地图初始显示级别
            zoom: 5,
        }),
        //加载控件到地图容器中
        //加载比例尺控件
        controls: defaults().extend([scaleLineControl]),
    });
};
onMounted(() => {
    initMap();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
    width: 100%;
    height: 650px;
}
</style>
