<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Map, View } from 'ol'
import { Tile } from 'ol/layer'
import { XYZ } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import { ATTRIBUTIONS } from '/constants'

const initMap = () => {
  //设置地图容器放置位置
  const container = document.getElementById('map')
  const TiandiMap_vec = new Tile({
    name: '天地图矢量图层',
    source: new XYZ({
      attributions: ATTRIBUTIONS,
      url:
        'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=3bc6874f2b919aa581635abab7759a3f',
      wrapX: false,
    }),
  })
  const TiandiMap_img = new Tile({
    name: '天地图影像图层',
    source: new XYZ({
      attributions: ATTRIBUTIONS,
      url:
        'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=3bc6874f2b919aa581635abab7759a3f',
      wrapX: false,
    }),
  })

  const map = new Map({
    //初始化map
    target: container,
    //地图容器中加载的图层
    layers: [TiandiMap_img, TiandiMap_vec],
    view: new View({
      center: fromLonLat([-109, 46.5]),
      zoom: 6,
    }),
  })
  //探查半径
  let radius = 75
  //添加键盘按下事件监听，用来控制探查范围的大小
  document.addEventListener('keydown', (evt) => {
    if (evt.which == 38) {
      radius = Math.min(radius + 5, 150)
      //map.render();
      evt.preventDefault()
    } else if (evt.which == 40) {
      radius = Math.max(radius - 5, 25)
      map.render()
      evt.preventDefault()
    }
  })

  // 实时得到鼠标的像素位置
  let mousePosition = null

  container.addEventListener('mousemove', (event) => {
    mousePosition = map.getEventPixel(event)
    map.render()
  })

  container.addEventListener('mouseout', () => {
    mousePosition = null
    map.render()
  })
  // 在渲染层之前,做剪裁
  TiandiMap_vec.on('prerender', (event) => {
    const ctx = event.context
    const pixelRatio = event.frameState.pixelRatio
    ctx.save()
    ctx.beginPath()
    if (mousePosition) {
      //只显示一个围绕着鼠标的圆圈
      ctx.arc(
        mousePosition[0] * pixelRatio,
        mousePosition[1] * pixelRatio,
        radius * pixelRatio,
        0,
        2 * Math.PI,
      )
      ctx.lineWidth = 5 * pixelRatio
      ctx.strokeStyle = 'rgba(0,0,0,0.5)'
      ctx.stroke()
    }
    ctx.clip()
  })

  // 呈现层后,恢复画布的背景
  TiandiMap_vec.on('postrender', (event) => {
    const ctx = event.context
    ctx.restore()
  })
}

onMounted(() => {
  initMap()
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 100%;
  height: 650px;
}
</style>
