<template>
    <div id="map"></div>
</template>

<script setup>
import "ol/ol.css";
import { Map, View } from "ol";
import { BingMaps } from "ol/source";
import { Tile as TileLayer } from "ol/layer";
import { onMounted } from "vue";
const key =
    "Q57tupj2UBsQNQdju4xL~xBceblfTd6icjljunbuaCw~AhwA-whmGMsfIpVhslZyknWhFYq-GvWJZqBnqV8Zq1uRlI5YM_qr7_hxvdgnU7nH";
onMounted(() => {
    new Map({
        //地图容器div的ID
        target: "map",
        //地图容器中加载的图层
        layers: [
            //加载瓦片图层数据
            new TileLayer({
                source: new BingMaps({ key: key, imagerySet: "Road" }),
            }),
        ],
        //地图视图设置
        view: new View({
            //地图初始中心点
            center: [0, 0],
            //地图初始显示级别
            zoom: 2,
        }),
    });
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
    height: 650px;
}
</style>
