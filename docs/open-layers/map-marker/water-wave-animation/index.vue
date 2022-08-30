<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import Feature from 'ol/Feature'
import { Map, Overlay } from 'ol'
import Point from 'ol/geom/Point'
import View from 'ol/View'
import { Circle as CircleStyle, Stroke, Style } from 'ol/style'
import { XYZ, Vector as VectorSource } from 'ol/source'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { easeOut } from 'ol/easing'
import { getVectorContext } from 'ol/render'
import { ATTRIBUTIONS, MAPURL, SHENZHEN, FUZHOU } from '/constants'
import { addVectorLabel } from './tools'

const initMap = () => {
  const tileLayer = new TileLayer({
    source: new XYZ({
      attributions: ATTRIBUTIONS,
      url: MAPURL,
      maxZoom: 20,
    }),
  })

  const source = new VectorSource({
    wrapX: false,
  })
  const vector = new VectorLayer({
    source: source,
  })

  const map = new Map({
    layers: [tileLayer, vector],
    target: 'map',
    view: new View({
      projection: 'EPSG:4326',
      center: SHENZHEN,
      //地图初始显示级别
      zoom: 5,
      multiWorld: true,
    }),
  })
  const duration = 3000
  function flash(feature) {
    let start = Date.now()
    const flashGeom = feature.getGeometry().clone()
    tileLayer.on('postrender', animate)
    function animate(event) {
      const frameState = event.frameState
      const elapsed = frameState.time - start
      const vectorContext = getVectorContext(event)
      const elapsedRatio = elapsed / duration
      // 开始半径为5，结束半径为30。
      const radius = easeOut(elapsedRatio) * 25 + 5
      const opacity = easeOut(1 - elapsedRatio)

      const style = new Style({
        image: new CircleStyle({
          radius: radius,
          stroke: new Stroke({
            color: 'rgba(255, 0, 0, ' + opacity + ')',
            width: 0.25 + opacity,
          }),
        }),
      })
      vectorContext.setStyle(style)
      vectorContext.drawGeometry(flashGeom)
      if (elapsed > duration) {
        start = frameState.time
      }
      // 告诉OpenLayers继续后期动画
      map.render()
    }
  }

  //第一种方式添加水纹动画
  const geom = new Point(SHENZHEN)
  const feature = new Feature(geom)
  source.addFeature(feature)
  flash(feature)
  //添加打工点
  addVectorLabel({
    coordinate: SHENZHEN,
    vectorSource: source,
    name: '打工点',
  })

  //第二种方式添加水纹动画
  const element = document.createElement('div')
  element.className = 'point_animation'
  const p = document.createElement('p')
  const span = document.createElement('span')
  element.appendChild(p)
  element.appendChild(span)
  const point_overlay = new Overlay({
    element: element,
    positioning: 'center-center',
  })
  map.addOverlay(point_overlay)
  point_overlay.setPosition(FUZHOU)
  //添加家
  addVectorLabel({
    coordinate: FUZHOU,
    vectorSource: source,
    name: '家',
  })
}
onMounted(() => {
  initMap()
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  position: relative;
  height: 650px;
}
/**橙色点扩散闪烁样式*/
:deep(.point_animation) {
  background: #ff9900;
  width: 6px;
  height: 6px;
  border: 2px #ff9900 solid;
  border-radius: 50%;
  position: absolute;
}
:deep(.point_animation p),
:deep(.point_animation span) {
  position: absolute;
  width: 4px;
  height: 4px;
  animation: point_animation 4s infinite;
  box-shadow: 0px 0px 1px #ff9900;
  margin: 0px;
  border-radius: 50%;
}
:deep(.point_animation span) {
  animation-delay: 1.5s;
}
@keyframes point_animation {
  10% {
    transform: scale(1);
  }
  100% {
    transform: scale(8);
  }
}
</style>
