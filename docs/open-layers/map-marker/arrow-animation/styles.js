import { Fill, Stroke, Circle, Style, Text } from 'ol/style'
import { AUTHOR_INFO } from '../../../constants'

export const textStyle = new Style({
  text: new Text({
    font: 'bold 26px Mirosoft Yahei',
    placement: 'line',
    text: AUTHOR_INFO.NAME.split('').join(' '),
    fill: new Fill({
      color: '#000',
    }),
    offsetY: 3,
    stroke: new Stroke({
      color: '#FFF',
      width: 2,
    }),
  }),
})
export const buttomPathStyle = new Style({
  stroke: new Stroke({
    color: [4, 110, 74],
    width: 28,
  }),
})
export const upperPathStyle = new Style({
  stroke: new Stroke({
    color: [0, 186, 107],
    width: 20,
  }),
})
export const outStyle = new Style({
  image: new Circle({
    radius: 18,
    fill: new Fill({
      color: [4, 110, 74],
    }),
  }),
})
export const midStyle = new Style({
  image: new Circle({
    radius: 15,
    fill: new Fill({
      color: [0, 186, 107],
    }),
  }),
})
export const innerDot = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({
      color: [255, 255, 255],
    }),
  }),
})
export const foutrStyle = new Style({
  image: new Circle({
    radius: 18,
    fill: new Fill({
      color: '#000',
    }),
  }),
})
export const fmidStyle = new Style({
  image: new Circle({
    radius: 15,
    fill: new Fill({
      color: '#FFF',
    }),
  }),
})
export const finnerStyle = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({
      color: '#000',
    }),
  }),
})
