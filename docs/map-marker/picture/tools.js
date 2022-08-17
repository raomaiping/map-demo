import { Style, Icon } from 'ol/style'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import image from './blue.png'
/**
 * 创建矢量标注样式函数,设置image为图标ol.style.Icon
 * @param {ol.Feature} feature 要素
 */
export const createLabelStyle = () =>
  new Style({
    image: new Icon({
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
  const newFeature = new Feature({
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
