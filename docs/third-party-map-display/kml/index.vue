<template>
    <div id="map" class="map"></div>
    <div id="info">&nbsp;</div>
</template>

<script setup>
import "ol/ol.css";
import KML from "ol/format/KML";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { onMounted } from "vue";
import { MAPURL, ATTRIBUTIONS } from "../../constants";

const raster = new TileLayer({
    source: new XYZ({
        attributions: ATTRIBUTIONS,
        url: MAPURL,
        maxZoom: 20,
    }),
});

const vector = new VectorLayer({
    source: new VectorSource({
        url: "./2022.kml",
        format: new KML(),
    }),
});

onMounted(() => {
    const map = new Map({
        layers: [raster, vector],
        target: document.getElementById("map"),
        view: new View({
            center: [876970.8463461736, 5859807.853963373],
            projection: "EPSG:3857",
            zoom: 10,
        }),
    });
    const displayFeatureInfo = (pixel) => {
        const features = [];

        map.forEachFeatureAtPixel(pixel, function (feature) {
            features.push(feature);
        });
        if (features.length > 0) {
            const info = [];
            let i, ii;
            for (i = 0, ii = features.length; i < ii; ++i) {
                info.push(features[i].get("name"));
            }
            document.getElementById("info").innerHTML =
                info.join(", ") || "(unknown)";
            map.getTarget().style.cursor = "pointer";
        } else {
            document.getElementById("info").innerHTML = "&nbsp;";
            map.getTarget().style.cursor = "";
        }
    };

    map.on("pointermove", function (evt) {
        if (evt.dragging) {
            return;
        }
        const pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
    });

    map.on("click", function (evt) {
        displayFeatureInfo(evt.pixel);
    });
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
    height: 650px;
}
</style>
