<template>
  <div id="map">
    <div class="setting">
      <div class="slider">
        <span>热点半径（radius size）：</span>
        <el-slider v-model="state.radiusSize" @input="handleRadiusChange" />
      </div>
      <div class="slider">
        <span>模糊尺寸（blur size）：</span>
        <el-slider v-model="state.blurSize" @input="handleBlurChange" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { Map, View } from 'ol'
import { Tile as TileLayer, Heatmap } from 'ol/layer'
import { defaults, FullScreen } from 'ol/control'
import { XYZ, Vector as VectorSource } from 'ol/source'
import { KML } from 'ol/format'
import { MAPURL, ATTRIBUTIONS } from '/constants'
const state = reactive({
  radiusSize: 10,
  blurSize: 15,
})
//创建一个Heatmap图层
const vector = new Heatmap({
  //矢量数据源（读取本地的KML数据）
  source: new VectorSource({
    url: '/kml/Earthquakes_Mag5.kml',
    format: new KML({
      extractStyles: false,
    }),
    wrapX: false,
  }),
  //热点半径
  radius: parseInt(state.radiusSize, 10),
  //模糊尺寸
  blur: parseInt(state.blurSize, 10),
})
//为矢量数据源添加addfeature事件监听
vector.getSource().on('addfeature', (event) => {
  // 示例数据2012_Earthquakes_Mag5.kml，可从其地标名称提取地震信息
  //要素的名称属性
  const name = event.feature.get('name')
  //得到要素的地震震级属性（magnitude）
  const magnitude = parseFloat(name.substr(2))
  //设置要素的weight属性
  event.feature.set('weight', magnitude - 5)
})
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
      vector,
    ],
    view: new View({
      projection: 'EPSG:4326', // 坐标系，有EPSG:4326和EPSG:3 857
      center: [0, 0],
      //地图初始显示级别
      minZoom: 2,
      zoom: 2,
    }),
    //加载控件到地图容器中
    controls: defaults().extend([
      new FullScreen(), //加载全屏显示控件（目前支持非IE内核浏览器）
    ]),
  })
}
// 设置热点半径
const handleRadiusChange = () => {
  //设置热点图层的热点半径
  vector.setRadius(parseInt(state.radiusSize, 10))
}
// 设置模糊尺寸
const handleBlurChange = () => {
  //设置热点图层的模糊尺寸
  vector.setBlur(parseInt(state.blurSize, 10))
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
.setting {
  position: absolute;
  top: 50px;
  right: 20px;
  width: 400px;
  height: 200px;
  z-index: 1;
  color: #fff;
  font-weight: bold;
}
</style>
