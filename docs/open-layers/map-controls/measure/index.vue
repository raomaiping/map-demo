<template>
  <div id="map">
    <div id="menu">
      几何体类型
      <el-select
        v-model="state.typeSelect"
        placeholder="Select"
        size="small"
        @change="handleChange"
        class="select"
      >
        <el-option
          v-for="item in state.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-checkbox
        v-model="state.checked"
        label="使用测地线的措施"
        size="large"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { Map, View } from 'ol'
import { Tile as TileLayer } from 'ol/layer'
import { Vector } from 'ol/source'
import { Polygon, LineString } from 'ol/geom'
import { unByKey } from 'ol/Observable'
import { MAPURL, ATTRIBUTIONS } from '../../../constants'
import XYZ from 'ol/source/XYZ'
import {
  createHelpTooltip,
  createMeasureTooltip,
  formatLength,
  formatArea,
  drawGeometricFigure,
  createVector,
} from './index'

const raster = new TileLayer({
  source: new XYZ({
    attributions: ATTRIBUTIONS,
    url: MAPURL,
    maxZoom: 20,
  }),
})

/**
 *  当用户正在绘制多边形时的提示信息文本
 * @type {string}
 */
const continuePolygonMsg = '单击继续绘制多边形'
/**
 * 当用户正在绘制线时的提示信息文本
 * @type {string}
 */
const source = new Vector()
const continueLineMsg = '单击继续绘制直线'
const state = reactive({
  checked: false,
  typeSelect: 'length',
  options: [
    {
      label: '长度',
      value: 'length',
    },
    {
      label: '面积',
      value: 'area',
    },
  ],
  map: null,
  sketch: null, // 当前绘制的要素
  helpTooltipElement: null, // 帮助提示框对象
  helpTooltip: null, // 帮助提示框显示的信息
  measureTooltipElement: null, // 测量工具提示框对象
  measureTooltip: null, // 测量工具中显示的测量值
  draw: null,
})
//初始化map
const initMap = () => {
  state.map = new Map({
    target: 'map',
    //地图容器中加载的图层
    layers: [
      //加载瓦片图层数据
      raster,
    ],
    view: new View({
      projection: 'EPSG:4326', // 坐标系，有EPSG:4326和EPSG:3 857
      center: [0, 0],
      //地图初始显示级别
      zoom: 5,
    }),
  })
}

// 加载测量的绘制矢量层
const loadVector = () => {
  // 加载测量的绘制矢量层
  const vector = createVector(source)
  state.map.addLayer(vector)
}
/**
 * 鼠标移动事件处理函数
 * @param {ol.MapBrowserEvent} evt
 */
const pointerMoveHandler = (evt) => {
  if (evt.dragging) {
    return
  }
  /** @type {string} */
  let helpMsg = '单击开始绘图' //当前默认提示信息
  //判断绘制几何类型设置相应的帮助提示信息
  if (state.sketch) {
    const getGeometry = state.sketch.getGeometry()
    if (getGeometry instanceof Polygon) {
      helpMsg = continuePolygonMsg //绘制多边形时提示相应内容
    } else if (getGeometry instanceof LineString) {
      helpMsg = continueLineMsg //绘制线时提示相应内容
    }
  }
  state.helpTooltipElement.innerHTML = helpMsg //将提示信息设置到对话框中显示
  state.helpTooltip.setPosition(evt.coordinate) //设置帮助提示框的位置
  state.helpTooltipElement.classList.remove('hidden')
}

/**
 * 加载交互绘制控件函数
 */
const addInteraction = () => {
  const type = state.typeSelect === 'area' ? 'Polygon' : 'LineString'
  state.draw = drawGeometricFigure({ source, type })
  state.map.addInteraction(state.draw)
  //创建测量工具提示框
  ;[state.measureTooltipElement, state.measureTooltip] = createMeasureTooltip({
    measureTooltipElement: state.measureTooltipElement,
    map: state.map,
  })
  //创建帮助提示框
  ;[state.helpTooltipElement, state.helpTooltip] = createHelpTooltip({
    helpTooltipElement: state.helpTooltipElement,
    map: state.map,
  })
  let listener
  //绑定交互绘制工具开始绘制的事件
  state.draw.on(
    'drawstart',
    function (evt) {
      // set sketch
      state.sketch = evt.feature //绘制的要素

      /** @type {ol.Coordinate|undefined} */
      let tooltipCoord = evt.coordinate // 绘制的坐标
      //绑定change事件，根据绘制几何类型得到测量长度值或面积值，并将其设置到测量工具提示框中显示
      listener = state.sketch.getGeometry().on('change', function (evt) {
        const geom = evt.target //绘制几何要素
        let output
        if (geom instanceof Polygon) {
          output = formatArea({
            checked: state.checked,
            polygon: geom,
            map: state.map,
          }) //面积值
          tooltipCoord = geom.getInteriorPoint().getCoordinates() //坐标
        } else if (geom instanceof LineString) {
          output = formatLength({
            checked: state.checked,
            line: geom,
            map: state.map,
          }) //长度值
          tooltipCoord = geom.getLastCoordinate() //坐标
        }
        state.measureTooltipElement.innerHTML = output //将测量值设置到测量工具提示框中显示
        state.measureTooltip.setPosition(tooltipCoord) //设置测量工具提示框的显示位置
      })
    },
    this,
  )
  //绑定交互绘制工具结束绘制的事件
  state.draw.on(
    'drawend',
    function () {
      state.measureTooltipElement.className = 'tooltip tooltip-static' //设置测量提示框的样式
      state.measureTooltip.setOffset([0, -7])
      // 未设置的草图
      state.sketch = null //置空当前绘制的要素对象
      // 取消设置工具提示，以便创建新的工具提示
      state.measureTooltipElement = null //置空测量工具提示框对象
      //重新创建一个测试工具提示框显示结果
      ;[
        state.measureTooltipElement,
        state.measureTooltip,
      ] = createMeasureTooltip({
        measureTooltipElement: state.measureTooltipElement,
        map: state.map,
      })
      unByKey(listener)
    },
    this,
  )
}

// 让用户切换选择测量类型（长度/面积）
const handleChange = () => {
  state.map.removeInteraction(state.draw) //移除绘制图形
  addInteraction() //添加绘图进行测量
}
onMounted(() => {
  initMap()
  loadVector()

  state.map.on('pointermove', pointerMoveHandler) //地图容器绑定鼠标移动事件，动态显示帮助提示框内容
  //地图绑定鼠标移出事件，鼠标移出时为帮助提示框设置隐藏样式
  state.map.getViewport().addEventListener('mouseout', () => {
    state.helpTooltipElement.classList.add('hidden')
  })
  addInteraction() //调用加载绘制交互控件方法，添加绘图进行测量
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  position: relative;
  width: 100%;
  height: 650px;
}

#menu {
  width: 450px;
  position: absolute;
  left: 20px;
  bottom: 20px;
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}

/**
    * 提示框的样式信息
    */
:deep(.tooltip) {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
}

:deep(.tooltip-measure) {
  opacity: 1;
  font-weight: bold;
}

:deep(.tooltip-static) {
  background-color: #ffcc33;
  color: black;
  border: 1px solid white;
}

:deep(.tooltip-measure:before),
:deep(.tooltip-static:before) {
  border-top: 6px solid rgba(0, 0, 0, 0.5);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  content: '';
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}

:deep(.tooltip-static:before) {
  border-top-color: #ffcc33;
}
</style>
