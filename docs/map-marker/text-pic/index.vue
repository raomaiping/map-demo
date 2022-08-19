<template>
  <div id="top">
    <el-radio-group v-model="state.type">
      <el-radio label="vector" size="large">Vector Labels</el-radio>
      <el-radio label="overlay" size="large">Overlay Labels</el-radio>
    </el-radio-group>
  </div>
  <div id="label" style="display: none;">
    <div id="marker" class="marker" title="Marker">
      <a
        class="address"
        id="address"
        target="_blank"
        href="https://juejin.cn/user/588993965598407"
      >
        标注点
      </a>
    </div>
  </div>
  <div id="map"></div>
</template>

<script setup>
import 'ol/ol.css'
import { onMounted, reactive } from 'vue'
import { Map, View, Feature, Overlay } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { defaults, FullScreen } from 'ol/control'
import { XYZ, Vector as VectorSource } from 'ol/source'
import { Point } from 'ol/geom'
import { ATTRIBUTIONS, SHENZHEN, MAPURL, NANCHANG } from '../../constants'
import { ElMessage } from 'element-plus'
import { createLabelStyle, addVectorLabel, addOverlayLabel } from './tools'

const state = reactive({
  map: null,
  vectorSource: null,
  type: '',
})
const raster = new TileLayer({
  source: new XYZ({
    attributions: ATTRIBUTIONS,
    url: MAPURL,
    maxZoom: 20,
  }),
})
const initMap = () => {
  state.map = new Map({
    //初始化map
    target: 'map',
    //地图容器中加载的图层
    layers: [
      //加载瓦片图层数据
      raster,
    ],
    view: new View({
      projection: 'EPSG:4326', // 坐标系，有EPSG:4326和EPSG:3 857
      center: SHENZHEN, // 深圳坐标
      //地图初始显示级别
      zoom: 5,
    }),
    //加载控件到地图容器中
    controls: defaults().extend([
      new FullScreen(), //加载全屏显示控件（目前支持非IE内核浏览器）
    ]),
  })
  //实例化Vector要素，通过矢量图层添加到地图容器中
  const iconFeature = new Feature({
    geometry: new Point(SHENZHEN),
    //名称属性
    name: '深圳市',
  })

  iconFeature.setStyle(createLabelStyle(iconFeature))
  //矢量标注的数据源
  state.vectorSource = new VectorSource({
    features: [iconFeature],
  })
  //矢量标注图层
  const vectorLayer = new VectorLayer({
    source: state.vectorSource,
  })
  state.map.addLayer(vectorLayer)

  // 实例化overlay标注，添加到地图容器中
  const marker = new Overlay({
    position: NANCHANG,
    positioning: 'center-center',
    element: document.getElementById('marker'),
    stopEvent: false,
  })
  state.map.addOverlay(marker)
  marker.getElement().title = '南昌市'
  const text = new Overlay({
    position: NANCHANG,
    element: document.getElementById('address'),
  })
  state.map.addOverlay(text)
  text.getElement().innerText = marker.getElement().title
}

onMounted(() => {
  initMap()
  state.map.on('click', (evt) => {
    if (!state.type) {
      ElMessage({
        message: '请先选择标注类型后用鼠标在地图上点击添加标注',
        type: 'warning',
      })
      return
    }
    //鼠标单击点坐标
    const coordinate = evt.coordinate
    if (state.type === 'vector') {
      //添加一个新的标注（矢量要素）
      addVectorLabel({
        coordinate,
        vectorSource: state.vectorSource,
      })
    }
    if (state.type === 'overlay') {
      //添加新的图文标注（overlay标注）
      addOverlayLabel({ coordinate, map: state.map })
    }
  })
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
}
#top {
  text-align: center;
  height: 50px;
  line-height: 50px;
}
:deep(.marker) {
  width: 20px;
  height: 20px;
  border: 1px solid #088;
  border-radius: 10px;
  background-color: #0ff;
  opacity: 0.5;
}

:deep(.address) {
  text-decoration: none;
  color: #aa3300;
  font-size: 14px;
  font-weight: bold;
  text-shadow: black 0.1em 0.1em 0.2em;
}
</style>
