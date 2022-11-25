/*
 *tileLayer.baidu.js
 */
// 引用
import 'proj4'
import 'proj4leaflet'
import * as L from 'leaflet'
import { ATTRIBUTIONS } from '../../../constants'
const titleD =
  'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles='

const urlPath = titleD
//请引入 proj4.js 和 proj4leaflet.js
L.CRS.BAIDU = new L.Proj.CRS(
  'EPSG:900913',
  '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
  {
    resolutions: (function () {
      const level = 19
      const res: number[] = []
      res[0] = Math.pow(2, 18)
      for (let i = 1; i < level; i++) {
        res[i] = Math.pow(2, 18 - i)
      }
      return res
    })(),
    origin: [0, 0],
    bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244]),
  },
)

L.tileLayer.baidu = function (option) {
  option = option || {}

  let layer: L.TileLayer | L.LayerGroup<any>
  const subdomains = '0123456789'
  switch (option.layer) {
    //单图层
    case 'vec':
    default:
      layer = L.tileLayer(urlPath, {
        subdomains: subdomains,
        tms: true,
        attribution: option.attribution || ATTRIBUTIONS,
      })

      // layer = L.tileLayer('http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=' + (option.bigfont ? 'ph' : 'pl') + '&scaler=1&p=1', {
      //   name: option.name, subdomains: subdomains, tms: true
      // });
      break
    case 'img_d':
      layer = L.tileLayer(
        'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
        {
          subdomains: subdomains,
          tms: true,
          attribution: option.attribution || ATTRIBUTIONS,
        },
      )
      break
    case 'img_z':
      layer = L.tileLayer(
        'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=' +
        (option.bigfont ? 'sh' : 'sl') +
        '&v=020',
        {
          subdomains: subdomains,
          tms: true,
          attribution: option.attribution || ATTRIBUTIONS,
        },
      )
      break

    case 'custom': //Custom 各种自定义样式
      //可选值：dark,midnight,grayscale,hardedge,light,redalert,googlelite,grassgreen,pink,darkgreen,bluish
      // option.customid = option.customid || 'midnight'
      // layer = L.tileLayer('http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=' + option.customid, {
      //     name: option.name, subdomains: "012", tms: true
      // });
      layer = L.tileLayer(urlPath, {
        subdomains: subdomains,
        tms: true,
        attribution: option.attribution || ATTRIBUTIONS,
      })
      break

    case 'time': //实时路况
      var time = new Date().getTime()
      layer = L.tileLayer(
        'http://its.map.baidu.com:8002/traffic/TrafficTileService?x={x}&y={y}&level={z}&time=' +
        time +
        '&label=web2D&v=017',
        {
          subdomains: subdomains,
          tms: true,
          attribution: option.attribution || ATTRIBUTIONS,
        },
      )
      break

    //合并
    case 'img':
      layer = L.layerGroup([
        L.tileLayer.baidu({
          layer: 'img_d',
          bigfont: option.bigfont,
        }),
        L.tileLayer.baidu({
          layer: 'img_z',
          bigfont: option.bigfont,
        }),
      ])
      break
  }
  return layer
}
