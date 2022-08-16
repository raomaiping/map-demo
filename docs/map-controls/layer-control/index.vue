<template>
    <div class="btns">
        <el-checkbox-group v-model="checkList" @change="handleSelectLayer">
            <el-checkbox label="天地图矢量图层" />
            <el-checkbox label="天地图矢量注记图层" />
            <el-checkbox label="天地图影像图层" />
            <el-checkbox label="天地图影像注记图层" />
        </el-checkbox-group>
    </div>
    <div id="map"></div>
</template>

<script setup>
import "ol/ol.css";
import { onMounted, ref } from "vue";
import { Map, View } from "ol";
import { Tile } from "ol/layer";
import { XYZ } from "ol/source";
import { ATTRIBUTIONS } from "../../constants";
const checkList = ref([
    "天地图矢量图层",
    "天地图矢量注记图层",
    "天地图影像图层",
    "天地图影像注记图层",
]);
const createTile = ({ name, url }) =>
    new Tile({
        name,
        source: new XYZ({
            attributions: ATTRIBUTIONS,
            url,
            wrapX: false,
        }),
    });
const tileUrls = {
    天地图矢量图层: createTile({
        name: "天地图矢量图层",
        url: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=3bc6874f2b919aa581635abab7759a3f",
    }),
    天地图矢量注记图层: createTile({
        name: "天地图矢量注记图层",
        url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=3bc6874f2b919aa581635abab7759a3f",
    }),

    天地图影像图层: createTile({
        name: "天地图影像图层",
        url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=3bc6874f2b919aa581635abab7759a3f",
    }),

    天地图影像注记图层: createTile({
        name: "天地图影像注记图层",
        url: "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=3bc6874f2b919aa581635abab7759a3f",
    }),
};
let map;
//地图视图的初始参数
const initMap = () => {
    map = new Map({
        //初始化map
        target: "map",
        //地图容器中加载的图层
        layers: Object.values(tileUrls),
        view: new View({
            //地图初始中心点
            center: [0, 0],
            //地图初始显示级别
            zoom: 2,
        }),
    });
};
const handleSelectLayer = (checkList) => {
    //获取地图中所有图层
    const layers = map.getLayers();
    for (let i = 0; i < layers.getLength(); i++) {
        //获取每个图层的名称
        const layer = layers.item(i);
        const layerName = layer.get("name");
        if (checkList.includes(layerName)) {
            layer.setVisible(true);
        } else {
            layer.setVisible(false);
        }
    }
};
onMounted(() => {
    initMap();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
    width: 650px;
    height: 650px;
}

.btns {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
}
</style>
