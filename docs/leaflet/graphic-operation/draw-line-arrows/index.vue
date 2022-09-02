<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet-polylinedecorator'
import { ATTRIBUTIONS } from '/constants'
let map = null
const initMap = () => {
  //地图容器
  map = L.map('map', {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: [30.5217, 114.3948],
    //当前显示等级
    zoom: 18,
  })

  //加载天地图矢量图层
  L.tileLayer(
    'http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610',
    { noWrap: true, attribution: ATTRIBUTIONS },
  ).addTo(map)
  //加载天地图矢量注记图层
  L.tileLayer(
    'http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610',
    { noWrap: true, attribution: ATTRIBUTIONS },
  ).addTo(map)
  //绘制图层
  const drawnItems = new L.FeatureGroup()
  //添加绘制图层
  map.addLayer(drawnItems)
  //1.绘制线
  const arrow = L.polyline(
    [
      [30.52247, 114.39332],
      [30.5209, 114.39332],
    ],
    {
      //颜色
      color: 'red',
    },
  ).addTo(drawnItems)
  //添加箭头
  L.polylineDecorator(arrow, {
    //添加模式
    patterns: [
      {
        //模式符号的偏移位置
        offset: '100%',
        //模式符号的重复间隔
        repeat: 0,
        //符号实例
        symbol: L.Symbol.arrowHead({
          //符号大小
          pixelSize: 15,
          //符号样式
          pathOptions: {
            //是否显示边线
            stroke: true,
          },
        }),
      },
    ],
  }).addTo(drawnItems)

  //2.绘制虚线矩形
  L.polylineDecorator(
    [
      [30.52172, 114.39359],
      [30.52172, 114.39428],
      [30.52153, 114.39428],
      [30.52153, 114.39359],
      [30.52172, 114.39359],
    ],
    {
      //添加模式
      patterns: [
        {
          //模式符号的偏移位置
          offset: 12,
          //模式符号的重复间隔
          repeat: 25,
          //符号实例
          symbol: L.Symbol.dash({
            //符号大小
            pixelSize: 10,
            //符号样式
            pathOptions: {
              //颜色
              color: '#f00',
              //线宽
              weight: 2,
            },
          }),
        },
        {
          //模式符号的偏移位置
          offset: 0,
          //模式符号的重复间隔
          repeat: 25,
          //符号实例
          symbol: L.Symbol.dash({
            //符号大小
            pixelSize: 0,
          }),
        },
      ],
    },
  ).addTo(drawnItems)

  //3.绘制图案
  L.polylineDecorator(
    [
      [30.52132, 114.39482],
      [30.52195, 114.39482],
      [30.52248, 114.39522],
      [30.52195, 114.39561],
      [30.52132, 114.39561],
      [30.52132, 114.39482],
    ],
    {
      //添加模式
      patterns: [
        {
          //模式符号的偏移位置
          offset: 0,
          //模式符号的重复间隔
          repeat: 10,
          //符号实例
          symbol: L.Symbol.dash({
            //符号大小
            pixelSize: 5,
            //符号样式
            pathOptions: {
              //颜色
              color: 'blue',
              //线宽
              weight: 1,
              //透明度
              opacity: 1,
            },
          }),
        },
        {
          //模式符号的偏移位置
          offset: '0%',
          //模式符号的重复间隔
          repeat: '20%',
          //符号实例
          symbol: L.Symbol.marker({
            //是否允许旋转
            rotate: true,
            //标记显示样式
            markerOptions: {
              //图标
              icon: L.icon({
                //图标地址
                iconUrl: '/image/icon_plane.png',
                //图标位置
                iconAnchor: [16, 16],
              }),
            },
          }),
        },
      ],
    },
  ).addTo(drawnItems)

  // 销毁地图
  onUnmounted(() => {
    map.remove()
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
  color: #3a3a3a;
}
</style>
