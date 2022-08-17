export default {
  title: 'OpenLayers Demo',
  description: 'OpenLayers',
  lastUpdated: true,
  head: [
    [
      'link',
      { rel: 'icon', href: '/logo.png' },
      //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ],
  ],
  themeConfig: {
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    logo: '/logo.png',
    nav: [{ text: '案例', link: '/map-controls/set-background/index' }],
    socialLinks: [
      { icon: 'github', link: 'http://10.10.20.230/architecture/map' },
    ],
    sidebar: getSidebar(),
    lastUpdatedText: '最近更新时间',
  },
}

function getSidebar() {
  return [
    {
      text: '地图控件',
      items: [
        {
          text: '设置背景',
          link: '/map-controls/set-background/index.md',
        },
        {
          text: '导航控件',
          link: '/map-controls/navigation/index.md',
        },
        {
          text: '基本操作',
          link: '/map-controls/operation/index.md',
        },
        {
          text: '图层控件',
          link: '/map-controls/layer-control/index.md',
        },
        {
          text: '鼠标位置',
          link: '/map-controls/mouse-position/index.md',
        },
        {
          text: '比例尺控件',
          link: '/map-controls/scale-line/index.md',
        },
        {
          text: '鹰眼控件',
          link: '/map-controls/overview-map/index.md',
        },
        {
          text: '全屏显示控件',
          link: '/map-controls/full-screen/index.md',
        },
        {
          text: '图层探查控件',
          link: '/map-controls/layer-search/index.md',
        },
        {
          text: '动画效果',
          link: '/map-controls/map-animation/index.md',
        },
        {
          text: '测量',
          link: '/map-controls/measure/index.md',
        },
        {
          text: '自定义控件',
          link: '/map-controls/custom-control/index.md',
        },
      ],
    },
    {
      text: '第三方地图显示',
      items: [
        {
          text: 'ArcGis',
          link: '/third-party-map-display/arc-gis/index.md',
        },
        {
          text: 'GeoJSON',
          link: '/third-party-map-display/geo-json/index.md',
        },
        {
          text: 'KML',
          link: '/third-party-map-display/kml/index.md',
        },
        {
          text: 'GPX',
          link: '/third-party-map-display/gpx/index.md',
        },
        {
          text: 'OSM',
          link: '/third-party-map-display/osm/index.md',
        },
        {
          text: '必应地图',
          link: '/third-party-map-display/bing/index.md',
        },
        {
          text: '天地图',
          link: '/third-party-map-display/tianditu-map/index.md',
        },
        {
          text: '百度地图',
          link: '/third-party-map-display/baidu-map/index.md',
        },
        {
          text: '谷歌地图',
          link: '/third-party-map-display/google-map/index.md',
        },
        {
          text: '高德地图',
          link: '/third-party-map-display/gao-de-map/index.md',
        },
        {
          text: '瓦片网格',
          link: '/third-party-map-display/canvas-tiles/index.md',
        },
        {
          text: '地图打印',
          link: '/third-party-map-display/map-export/index.md',
        },
      ],
    },
    {
      text: '地图标注',
      items: [
        {
          text: '文字标注',
          link: '/map-marker/text/index.md',
        },
        {
          text: '图片标注',
          link: '/map-marker/picture/index.md',
        },
        {
          text: '图文标注',
          link: '/map-marker/text-pic/index.md',
        },
      ],
    },
  ]
}
