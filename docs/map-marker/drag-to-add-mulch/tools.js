import { Style, Icon } from 'ol/style'
import { Feature } from 'ol'
import { Point } from 'ol/geom'

/**
 * 创建矢量标注样式函数,设置image为图标ol.style.Icon
 * @param {ol.Feature} feature 要素
 */
export const createLabelStyle = (imageUrl) =>
  new Style({
    image: new Icon({
      crossOrigin: 'anonymous',
      //图标的url
      src: imageUrl,
      scale: 0.1,
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
  imageUrl,
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
  newFeature.setStyle(createLabelStyle(imageUrl))
  //将新要素添加到数据源中
  vectorSource.addFeature(newFeature)
}
