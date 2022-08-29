<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Map, View } from 'ol'
import { XYZ } from 'ol/source'
import TileLayer from 'ol/layer/Tile'
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import { getVectorContext } from 'ol/render'
import { Style, Icon } from 'ol/style'
import { ATTRIBUTIONS, MAPURL } from '../../../constants'
import {
  textStyle,
  buttomPathStyle,
  upperPathStyle,
  outStyle,
  midStyle,
  innerDot,
  foutrStyle,
  fmidStyle,
  finnerStyle,
} from './styles'
import soul from './soul.json'
import arrow from '../../../public/arrow.png'

const initMap = () => {
  const tileLayer = new TileLayer({
    source: new XYZ({
      attributions: ATTRIBUTIONS,
      url: MAPURL,
      maxZoom: 20,
    }),
  })
  const map = new Map({
    target: 'map',
    layers: [tileLayer],
    view: new View({
      center: [11936406.337013, 3786384.633134],
      zoom: 5,
      constrainResolution: true,
    }),
  })
  const vSource = new VectorSource()
  const vLayer = new VectorLayer({
    source: vSource,
  })
  const geojsonFormat = new GeoJSON()
  const features = geojsonFormat.readFeatures(soul, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857',
  })
  const street = features[0]
  map.addLayer(vLayer)
  map.getView().fit(street.getGeometry())
  street.setStyle(textStyle)
  vSource.addFeature(street)

  let offset = 0.01
  tileLayer.on('postrender', (evt) => {
    const vct = getVectorContext(evt)
    vct.drawFeature(street, buttomPathStyle)
    vct.drawFeature(street, upperPathStyle)
    const numArr = Math.ceil(
      street.getGeometry().getLength() / map.getView().getResolution() / 100,
    )
    const points = []
    for (let i = 0; i <= numArr; i++) {
      let fracPos = i / numArr + offset
      if (fracPos > 1) fracPos -= 1
      const pf = new Feature(
        new Point(street.getGeometry().getCoordinateAt(fracPos)),
      )
      points.push(pf)
    }

    //确定方向并绘制
    street.getGeometry().forEachSegment((start, end) => {
      points.forEach((item) => {
        const line = new LineString([start, end])
        const coord = item.getGeometry().getFirstCoordinate()
        const cPoint = line.getClosestPoint(coord)
        if (
          Math.abs(cPoint[0] - coord[0]) < 1 &&
          Math.abs(cPoint[1] - coord[1]) < 1
        ) {
          const myImage = new Image(120, 120)
          myImage.src = arrow
          const dx = end[0] - start[0]
          const dy = end[1] - start[1]
          let rotation = Math.atan(dx / dy)
          rotation = dy > 0 ? rotation : Math.PI + rotation
          vct.setStyle(
            new Style({
              image: new Icon({
                img: myImage,
                imgSize: [120, 120],
                scale: 0.2,
                rotation: rotation,
                offset: [40, 60],
              }),
            }),
          )
          vct.drawGeometry(item.getGeometry())
        }
      })
      vct.setStyle(outStyle)
      vct.drawGeometry(new Point(street.getGeometry().getFirstCoordinate()))
      vct.setStyle(midStyle)
      vct.drawGeometry(new Point(street.getGeometry().getFirstCoordinate()))
      vct.setStyle(innerDot)
      vct.drawGeometry(new Point(street.getGeometry().getFirstCoordinate()))
      vct.setStyle(foutrStyle)
      vct.drawGeometry(new Point(street.getGeometry().getLastCoordinate()))
      vct.setStyle(fmidStyle)
      vct.drawGeometry(new Point(street.getGeometry().getLastCoordinate()))
      vct.setStyle(finnerStyle)
      vct.drawGeometry(new Point(street.getGeometry().getLastCoordinate()))
    })

    offset = offset + 0.003
    //复位
    if (offset >= 1) offset = 0.001
    map.render()
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
