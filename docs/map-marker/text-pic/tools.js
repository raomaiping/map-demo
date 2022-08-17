import { Style, Icon, Text, Fill, Stroke } from 'ol/style'
import { Feature, Overlay } from 'ol'
import { Point } from 'ol/geom'
import image from '../../public/blue.png'
/**
 * 创建矢量标注样式函数,设置image为图标ol.style.Icon
 * @param {ol.Feature} feature 要素
 */
export const createLabelStyle = (feature) =>
  new Style({
    image: new Icon(
      /** @type {olx.style.IconOptions} */
      ({
        //设置图标点
        anchor: [0.5, 60],
        //图标起点
        anchorOrigin: 'top-right',
        //指定x值为图标点的x值
        anchorXUnits: 'fraction',
        //指定Y值为像素的值
        anchorYUnits: 'pixels',
        //偏移
        offsetOrigin: 'top-right',
        // offset:[0,10],
        //图标缩放比例
        scale: 0.4,
        //透明度
        opacity: 0.75,
        //图标的url
        src: image,
      }),
    ),
    text: new Text({
      //位置
      textAlign: 'center',
      //基准线
      textBaseline: 'middle',
      //文字样式
      font: 'normal 14px 微软雅黑',
      //文本内容
      text: feature.get('name'),
      //文本填充样式（即文字颜色）
      fill: new Fill({ color: '#aa3300' }),
      stroke: new Stroke({ color: '#ffcc33', width: 2 }),
    }),
  })

/**
 * 添加一个新的标注（矢量要素）
 * @param {ol.Coordinate} coordinate 坐标点
 * @param {ol.source.Vector} vectorSource 矢量标注的数据源
 */
export const addVectorLabel = ({ coordinate, vectorSource }) => {
  //新建一个要素 ol.Feature
  const newFeature = new Feature({
    //几何信息
    geometry: new Point(coordinate),
    //名称属性
    name: '标注点',
  })
  //设置要素的样式
  newFeature.setStyle(createLabelStyle(newFeature))
  //将新要素添加到数据源中
  vectorSource.addFeature(newFeature)
}

/**
 * 添加一个新的图文标注（overlay标注）
 * @param {ol.Coordinate} coordinate 坐标点
 * @param {ol.Map} map 地图实例
 */
export const addOverlayLabel = ({ coordinate, map }) => {
  //新增div元素
  const elementDiv = document.createElement('div')
  elementDiv.className = 'marker'
  elementDiv.title = '标注点'
  // 获取id为label的元素
  const overlay = document.getElementById('label')
  // 为ID为label的div层添加div子节点
  overlay.appendChild(elementDiv)
  //新增a元素
  const elementA = document.createElement('a')
  elementA.className = 'address'
  elementA.href = '#'
  //设置文本
  setInnerText(elementA, elementDiv.title)
  // 新建的div元素添加a子节点
  elementDiv.appendChild(elementA)
  //实例化图文标注（图形+文本），添加到地图容器中
  const newMarker = new Overlay({
    position: coordinate,
    positioning: 'center-center',
    element: elementDiv,
    stopEvent: false,
  })
  map.addOverlay(newMarker)
  const newText = new Overlay({
    position: coordinate,
    element: elementA,
  })
  map.addOverlay(newText)
}
/**
 * 动态设置元素文本内容（兼容）
 */
function setInnerText(element, text) {
  if (typeof element.textContent == 'string') {
    element.textContent = text
  } else {
    element.innerText = text
  }
}
