<template>
    <div id="map"></div>
</template>

<script setup>
import "ol/ol.css";
import { onMounted } from "vue";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { defaults, OverviewMap } from "ol/control";
import { XYZ } from "ol/source";
import { MAPURL, ATTRIBUTIONS } from "../../constants";

const raster = new TileLayer({
    source: new XYZ({
        attributions: ATTRIBUTIONS,
        url: MAPURL,
        maxZoom: 20,
    }),
});
const initMap = () => {
    new Map({
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
        }),
        //加载控件到地图容器中
        controls: defaults().extend([
            new OverviewMap({
                className: "ol-overviewmap ol-custom-overviewmap",
                layers: [
                    new TileLayer({
                        source: new OSM({
                            // 使用不同样式的底图
                            url:
                                "https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png" +
                                "?apikey=0e6fc415256d4fbb9b5166a718591d71",
                        }),
                    }),
                ],
                collapseLabel: "\u00BB",
                label: "\u00AB",
                collapsed: false,
            }),
        ]),
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

/* 控制插件的样式和位置 */
:deep(.ol-custom-overviewmap),
:deep(.ol-custom-overviewmap.ol-uncollapsible) {
    bottom: auto;
    left: auto;
    right: 0;
    top: 0;
}

:deep(.ol-custom-overviewmap:not(.ol-collapsed)) {
    border: 1px solid black;
}

:deep(.ol-custom-overviewmap .ol-overviewmap-map) {
    border: none;
    width: 300px;
}

:deep(.ol-custom-overviewmap .ol-overviewmap-box) {
    border: 2px solid red;
}

:deep(.ol-custom-overviewmap:not(.ol-collapsed) button) {
    bottom: auto;
    left: auto;
    right: 1px;
    top: 1px;
}

:deep(.ol-rotate) {
    top: 170px;
    right: 0;
}
</style>
