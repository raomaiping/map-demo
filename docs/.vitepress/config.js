import { LeafLet, OpenLayers } from './getSidebar'
export default {
  title: 'Map Demo',
  description: 'OpenLayers Leaflet',
  lastUpdated: true,
  head: [
    [
      'link',
      { rel: 'icon', href: '/logo.webp' },
      //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ],
  ],
  themeConfig: {
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    logo: '/logo.webp',
    nav: [
      {
        text: 'OpenLayers 案例合集',
        link: '/open-layers/map-controls/set-background/index',
      },
      {
        text: 'Leaflet 案例合集',
        link: '/leaflet/introduction/map-display/index',
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'http://10.10.20.230/architecture/map' },
    ],
    sidebar: {
      '/open-layers/': OpenLayers,
      '/leaflet/': LeafLet,
    },
    lastUpdatedText: '最近更新时间',
  },
}
