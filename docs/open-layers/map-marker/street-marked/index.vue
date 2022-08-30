<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import GeoJSON from 'ol/format/GeoJSON'
import { Map, View } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { defaults, FullScreen } from 'ol/control'
import { XYZ, Vector as VectorSource } from 'ol/source'
import { getCenter } from 'ol/extent'
import { Fill, Style, Text } from 'ol/style'
import { MAPURL, ATTRIBUTIONS } from '../../../constants'
const style = new Style({
  text: new Text({
    font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
    placement: 'line',
    fill: new Fill({
      color: 'white',
    }),
  }),
})
const raster = new TileLayer({
  source: new XYZ({
    attributions: ATTRIBUTIONS,
    url: MAPURL,
    maxZoom: 20,
  }),
})
const viewExtent = [1817379, 6139595, 1827851, 6143616]
const initMap = () => {
  new Map({
    //初始化map
    target: 'map',
    //地图容器中加载的图层
    layers: [
      //加载瓦片图层数据
      raster,
      new VectorLayer({
        declutter: true,
        source: new VectorSource({
          format: new GeoJSON(),
          url: '/geojson/vienna-streets.geojson',
        }),
        style: function (feature) {
          style.getText().setText(feature.get('name'))
          return style
        },
      }),
    ],
    view: new View({
      extent: viewExtent,
      center: getCenter(viewExtent),
      //地图初始显示级别
      zoom: 17,
      minZoom: 14,
    }),
    //加载控件到地图容器中
    controls: defaults().extend([
      new FullScreen(), //加载全屏显示控件（目前支持非IE内核浏览器）
    ]),
  })
}
onMounted(() => {
  initMap()
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
}
</style>
