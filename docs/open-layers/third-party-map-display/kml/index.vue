<template>
  <div id="map" class="map"></div>
</template>

<script setup>
import KML from 'ol/format/KML'
import Map from 'ol/Map'
import VectorSource from 'ol/source/Vector'
import View from 'ol/View'
import XYZ from 'ol/source/XYZ'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { onMounted } from 'vue'
import { MAPURL, ATTRIBUTIONS } from '../../../constants'

const raster = new TileLayer({
  source: new XYZ({
    attributions: ATTRIBUTIONS,
    url: MAPURL,
    maxZoom: 20,
  }),
})

const vector = new VectorLayer({
  source: new VectorSource({
    url: '/kml/2022.kml',
    format: new KML(),
  }),
})

onMounted(() => {
  new Map({
    layers: [raster, vector],
    target: 'map',
    view: new View({
      center: [876970.8463461736, 5859807.853963373],
      projection: 'EPSG:3857',
      zoom: 10,
    }),
  })
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
}
</style>
