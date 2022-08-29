<template>
  <div id="map">
    <div id="popup" class="ol-popup">
      <a
        href="javascript:void(0)"
        id="popup-closer"
        class="ol-popup-closer"
      ></a>
      <div id="popup-content"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Map, View, Feature } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { defaults, FullScreen } from 'ol/control'
import { XYZ, Vector as VectorSource } from 'ol/source'
import { Point } from 'ol/geom'
import { ATTRIBUTIONS, SHENZHEN, MAPURL } from '../../../constants'
import {
  createLabelStyle,
  createPopup,
  featuerInfo,
  addFeatrueInfo,
} from './tools'

const raster = new TileLayer({
  source: new XYZ({
    attributions: ATTRIBUTIONS,
    url: MAPURL,
    maxZoom: 20,
  }),
})
const initMap = () => {
  const map = new Map({
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
  const vectorSource = new VectorSource({
    features: [iconFeature],
  })
  //矢量标注图层
  const vectorLayer = new VectorLayer({
    source: vectorSource,
  })
  map.addLayer(vectorLayer)

  /**
   * 实现popup的html元素
   */
  const container = document.getElementById('popup')
  const content = document.getElementById('popup-content')
  const closer = document.getElementById('popup-closer')

  /**
   * 在地图容器中创建一个Overlay
   */
  const popup = createPopup(container)
  map.addOverlay(popup)
  /**
   * 添加关闭按钮的单击事件（隐藏popup）
   * @return {boolean} Don't follow the href.
   */
  closer.onclick = () => {
    //未定义popup位置
    popup.setPosition(undefined)
    //失去焦点
    closer.blur()
  }
  /**
   * 为map添加点击事件监听，渲染弹出popup
   */
  map.on('click', (evt) => {
    //判断当前单击处是否有要素，捕获到要素时弹出popup
    const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature)
    console.log(feature)
    if (feature) {
      //清空popup的内容容器
      content.innerHTML = ''
      //在popup中加载当前要素的具体信息
      addFeatrueInfo({ info: featuerInfo, content })
      if (popup.getPosition() == undefined) {
        //设置popup的位置
        popup.setPosition(featuerInfo.geo)
      }
    }
  })

  /**
   * 为map添加鼠标移动事件监听，当指向标注时改变鼠标光标状态
   */
  map.on('pointermove', (e) => {
    const pixel = map.getEventPixel(e.originalEvent)
    const hit = map.hasFeatureAtPixel(pixel)
    map.getTargetElement().style.cursor = hit ? 'pointer' : ''
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
.ol-popup {
  position: absolute;
  width: 200px;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 45px;
  left: -50px;
  color: #000;
}

.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}

.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}

.ol-popup-closer:after {
  content: '✖';
}

#popup-content {
  font-size: 14px;
  font-family: '微软雅黑';
}

#popup-content .markerInfo {
  font-weight: bold;
}
:deep(.markerImg) {
  width: 210px;
}
</style>
