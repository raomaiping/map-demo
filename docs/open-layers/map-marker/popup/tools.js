import { Style, Icon, Text, Fill, Stroke } from 'ol/style'
import { Overlay } from 'ol'
import { SHENZHEN, AUTHOR_INFO } from '../../../constants'
//示例标注点北京市的信息对象
export const featuerInfo = {
  geo: SHENZHEN,
  att: {
    //标注信息的标题内容
    title: AUTHOR_INFO.NAME,
    //标注详细信息链接
    titleURL: AUTHOR_INFO.JUEJIN,
    //标注内容简介
    text: `
    <br/>
    年龄：${AUTHOR_INFO.AGE}<br/>
    性别：${AUTHOR_INFO.SEX}<br/>
    目前居住地：${AUTHOR_INFO.LOCATION}<br/>
    QQ：${AUTHOR_INFO.QQ}<br/>
    WX：${AUTHOR_INFO.WX}<br/>
    <br/>
    `,
    //标注的图片
    imgURL: AUTHOR_INFO.AVATAR,
  },
}

export const createPopup = (container) =>
  new Overlay(
    /** @type {olx.OverlayOptions} */
    ({
      //要转换成overlay的HTML元素
      element: container,
      //当前窗口可见
      autoPan: true,
      //Popup放置的位置
      positioning: 'bottom-center',
      //是否应该停止事件传播到地图窗口
      stopEvent: false,
      autoPanAnimation: {
        //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
        duration: 250,
      },
    }),
  )

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
        src: '/image/blue.png',
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
 * 动态创建popup的具体内容
 * @param {Object} info 弹框信息
 * @param {Element} content 弹框内容节点
 */
export const addFeatrueInfo = ({ info, content }) => {
  //新增a元素
  const elementA = document.createElement('a')
  elementA.className = 'markerInfo'
  elementA.href = info.att.titleURL
  setInnerText(elementA, info.att.title)
  // 新建的div元素添加a子节点
  content.appendChild(elementA)
  //新增div元素
  const elementDiv = document.createElement('div')
  elementDiv.className = 'markerText'
  elementDiv.innerHTML = info.att.text
  // 为content添加div子节点
  content.appendChild(elementDiv)
  //新增img元素
  const elementImg = document.createElement('img')
  elementImg.className = 'markerImg'
  elementImg.src = info.att.imgURL
  // 为content添加img子节点
  content.appendChild(elementImg)
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
