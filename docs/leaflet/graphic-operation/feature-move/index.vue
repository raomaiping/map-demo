<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import { ATTRIBUTIONS } from '/constants'

const initMap = () => {
  //地图容器
  const map = L.map('map', {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: [30.5217, 114.3948],
    //不允许地图拖拽
    dragging: false,
    //当前显示等级
    zoom: 18,
    // 映射容器
    pmIgnore: false,
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
  //绘制矩形
  const rectangle = L.rectangle(
    [
      [30.52172, 114.39359],
      [30.52153, 114.39428],
    ],
    {
      //颜色
      color: '#ff7800',
      //线宽
      weight: 1,
      //填充色透明度
      fillOpacity: 0.5,
    },
  ).addTo(map)
  //图形移动
  featureMove(rectangle, map)
  // 销毁地图
  onUnmounted(() => {
    map.remove()
  })
}
onMounted(() => {
  initMap()
})

/**
 * 图形移动
 */
function featureMove(rectangle, map) {
  /**矢量图层鼠标按压事件
   *  @param {string} type 事件类型（鼠标按下）
   *  @param {function} fn 事件触发后的响应函数
   */
  rectangle.once('mousedown', function (e) {
    //获取鼠标按下位置的纬经度坐标
    const coordinate1 = e.latlng
    //监听地图移动事件，实时改变图形位置
    map.on('mousemove ', function (e) {
      //移动位置处的坐标
      const coordinate2 = e.latlng
      //计算坐标偏移
      const dx = coordinate2.lat - coordinate1.lat
      const dy = coordinate2.lng - coordinate1.lng
      //重新设置矩形位置
      const latlngs = [
        [30.52172 + dx, 114.39359 + dy],
        [30.52153 + dx, 114.39428 + dy],
      ]
      rectangle.setBounds(latlngs)
    })
  })

  /**矢量图层鼠标释放事件
   *  @param {string} type 事件类型（鼠标释放）
   *  @param {function} fn 事件触发后的响应函数
   */
  rectangle.once('mouseup', function (e) {
    //鼠标释放后，注销鼠标移动事件
    map.off('mousemove')
    alert('移动完成！')
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 650px;
  color: #3a3a3a;
}
</style>
