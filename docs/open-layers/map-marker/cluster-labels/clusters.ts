import { Feature, Map } from 'ol'
import { Point } from 'ol/geom'
import { Vector as VectorSource, Cluster } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import { Style, Circle, Stroke, Fill, Text } from 'ol/style'

//此示例创建10000个要素
const count = 10000
const features: Feature<Point>[] = new Array(count)
const e = 4500000
for (let i = 0; i < count; ++i) {
  const coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e]
  features[i] = new Feature(new Point(coordinates))
}
//矢量要素数据源
const source = new VectorSource({
  features: features,
})
//聚合标注数据源
const clusterSource = new Cluster({
  distance: 40,
  source: source,
})
//加载聚合标注的矢量图层
const styleCache = {}
export const clusters = new VectorLayer({
  source: clusterSource,
  style: (feature): Style[] => {
    const size: number = feature.get('features').length
    let style: Style[] = styleCache[size]
    if (!style) {
      style = [
        new Style({
          image: new Circle({
            radius: 10,
            stroke: new Stroke({
              color: '#fff',
            }),
            fill: new Fill({
              color: '#3399CC',
            }),
          }),
          text: new Text({
            text: size.toString(),
            fill: new Fill({
              color: '#fff',
            }),
          }),
        }),
      ]
      styleCache[size] = style
    }
    return style
  },
})

/**
 * 添加聚合要素
 * @param {ol.Map} map 地图实例
 */
export const addClusterLabels = (map: Map) => {
  //当前聚合标注数据源中的要素
  const currentFeatrues = clusterSource?.getSource()?.getFeatures()
  //如果聚合标注数据源中没有要素，则重新添加要素
  if (currentFeatrues && currentFeatrues.length == 0) {
    clusterSource?.getSource()?.addFeatures(features)
    clusters.setSource(clusterSource)
    map.addLayer(clusters)
  }
}

/**
 * 移除聚合要素
 * @param {ol.Map} map 地图实例
 */
export const removeClusterLabels = (map: Map) => {
  //当前聚合标注数据源中的要素
  const currentFeatrues = clusterSource?.getSource()?.getFeatures()
  //如果聚合标注数据源中没有要素，则重新添加要素
  if (currentFeatrues && currentFeatrues.length != 0) {
    //移除聚合标注数据源中的所有要素
    clusterSource?.getSource()?.clear()
    //移除标注图层
    map.removeLayer(clusters)
  }
}
