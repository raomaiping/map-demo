<template>
  <div class="mapBox">
    <div class="map" id="canvasMap">
      <div class="title">Canvas</div>
    </div>
    <div class="map" id="webglMap">
      <div class="title">WebGL</div>
    </div>
  </div>
</template>

<script setup>
import 'ol/ol.css'
import { onMounted } from 'vue'
import { Map, View } from 'ol'
import { Tile as TileLayer, WebGLTile } from 'ol/layer'
import { defaults, FullScreen } from 'ol/control'
import { XYZ } from 'ol/source'
import { ATTRIBUTIONS } from '../../constants'

const initMap = () => {
  //加载canvas渲染模式的地图做为主图,默认是canvas渲染模式
  const canvasMap = new Map({
    layers: [
      new TileLayer({
        title: '天地图矢量图层',
        source: new XYZ({
          attributions: ATTRIBUTIONS,
          url:
            'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=3bc6874f2b919aa581635abab7759a3f',
          wrapX: false,
        }),
      }),
      new TileLayer({
        title: '天地图矢量图层注记',
        source: new XYZ({
          attributions: ATTRIBUTIONS,
          url:
            'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=3bc6874f2b919aa581635abab7759a3f',
          wrapX: false,
        }),
      }),
    ],
    target: 'canvasMap', //地图容器div的ID
    view: new View({
      center: [12723048, 3575638], //地图初始中心点
      minZoom: 2,
      zoom: 6,
    }),
    //加载控件到地图容器中
    controls: defaults().extend([
      new FullScreen(), //加载全屏显示控件（目前支持非IE内核浏览器）
    ]),
  })

  const webglMap = new Map({
    layers: [
      new WebGLTile({
        title: '天地图矢量图层',
        source: new XYZ({
          attributions: ATTRIBUTIONS,
          url:
            'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=3bc6874f2b919aa581635abab7759a3f',
          crossOrigin: 'anonymous',
          wrapX: false,
        }),
      }),
      new WebGLTile({
        title: '天地图矢量图层注记',
        source: new XYZ({
          attributions: ATTRIBUTIONS,
          url:
            'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=3bc6874f2b919aa581635abab7759a3f',
          crossOrigin: 'anonymous',
          wrapX: false,
        }),
        //加载控件到地图容器中
        controls: defaults().extend([
          new FullScreen(), //加载全屏显示控件（目前支持非IE内核浏览器）
        ]),
      }),
    ],
    target: 'webglMap', //地图容器div的ID
    view: canvasMap.getView(), //设置为主图的视图对象
  })
}
onMounted(() => {
  initMap()
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mapBox {
  height: 650px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}
.map {
  position: relative;
  width: 100%;
  height: 48%;
  border: 2px dashed red;
  box-shadow: 0 0 10px #000;
}
.title {
  width: 200px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  color: red;
  text-align: center;
}
</style>
