<template>
    <div id="map" class="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import "ol/ol.css";
import GPX from "ol/format/GPX";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { MAPURL, ATTRIBUTIONS } from "../../constants";

const raster = new TileLayer({
    source: new XYZ({
        attributions: ATTRIBUTIONS,
        url: MAPURL,
        maxZoom: 20,
    }),
});

const style = {
    Point: new Style({
        image: new CircleStyle({
            fill: new Fill({
                color: "rgba(255,255,0,0.4)",
            }),
            radius: 5,
            stroke: new Stroke({
                color: "#ff0",
                width: 1,
            }),
        }),
    }),
    LineString: new Style({
        stroke: new Stroke({
            color: "#f00",
            width: 3,
        }),
    }),
    MultiLineString: new Style({
        stroke: new Stroke({
            color: "#0f0",
            width: 3,
        }),
    }),
};

const vector = new VectorLayer({
    source: new VectorSource({
        url: "./fells_loop.gpx",
        format: new GPX(),
    }),
    style: function (feature) {
        return style[feature.getGeometry().getType()];
    },
});

onMounted(() => {
    new Map({
        layers: [raster, vector],
        target: "map",
        view: new View({
            center: [-7916041.528716288, 5228379.045749711],
            zoom: 12,
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
