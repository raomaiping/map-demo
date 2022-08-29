import { Style, Text, Fill, Stroke } from 'ol/style'
import { Feature } from 'ol'
import { Point } from 'ol/geom'

/**
 * 创建矢量标注样式函数,设置image为图标ol.style.Icon
 * @param {ol.Feature} feature 要素
 */
export const createLabelStyle = (feature) =>
  new Style({
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
      offsetY: 40,
    }),
  })

/**
 * 添加一个新的标注（矢量要素）
 * @param {ol.Coordinate} coordinate 坐标点
 * @param {ol.source.Vector} vectorSource 矢量标注的数据源
 * @param {String} name 标注名
 */
export const addVectorLabel = ({
  coordinate,
  vectorSource,
  name = '标注点',
}) => {
  //新建一个要素 ol.Feature
  var newFeature = new Feature({
    //几何信息
    geometry: new Point(coordinate),
    //名称属性
    name,
  })
  //设置要素的样式
  newFeature.setStyle(createLabelStyle(newFeature))
  //将新要素添加到数据源中
  vectorSource.addFeature(newFeature)
}
