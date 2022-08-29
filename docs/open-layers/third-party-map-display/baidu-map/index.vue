<template>
  <div id="map"></div>
</template>

<script setup>
import { Map, View } from 'ol'
import { TileImage } from 'ol/source'
import { Tile as TileLayer } from 'ol/layer'
import { onMounted } from 'vue'
import { get } from 'ol/proj'
import TileGrid from 'ol/tilegrid/TileGrid'
import { ATTRIBUTIONS } from '../../../constants'
//坐标参考系
const projection = get('EPSG:3857')
//分辨率
const resolutions = []
for (let i = 0; i < 19; i += 1) {
  resolutions[i] = Math.pow(2, 18 - i)
}
const tilegrid = new TileGrid({
  origin: [0, 0],
  resolutions: resolutions,
})

//拼接百度地图出图地址
const baidu_source = new TileImage({
  //设置坐标参考系
  projection: projection,
  //设置分辨率
  tileGrid: tilegrid,
  attributions: ATTRIBUTIONS,
  //出图基地址
  tileUrlFunction: (tileCoord) => {
    if (!tileCoord) {
      return ''
    }
    const z = tileCoord[0]
    let x = tileCoord[1]
    let y = tileCoord[2]

    if (x < 0) {
      x = 'M' + -x
    }
    if (y < 0) {
      y = 'M' + -y
    }
    return (
      'http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=' +
      x +
      '&y=' +
      y +
      '&z=' +
      z +
      '&styles=pl&udt=20151021&scaler=1&p=1'
    )
  },
})
//百度地图
const baidu_layer = new TileLayer({
  source: baidu_source,
})

onMounted(() => {
  new Map({
    //地图容器div的ID
    target: 'map',
    //地图容器中加载的图层
    layers: [
      //加载瓦片图层数据
      baidu_layer,
    ],
    //地图视图设置
    view: new View({
      //地图初始中心点
      center: [0, 0],
      //地图初始显示级别
      zoom: 2,
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
