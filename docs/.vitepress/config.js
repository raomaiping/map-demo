import { LeafLet, OpenLayers } from './getSidebar'
export default {
  title: 'Map Demo',
  description: 'OpenLayers Leaflet',
  lastUpdated: true,
  ignoreDeadLinks: true,
  head: [
    [
      'link',
      { rel: 'icon', href: '/image/logo.webp' },
      //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ],
  ],
  themeConfig: {
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    logo: '/image/logo.webp',
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
      { icon: 'github', link: 'https://github.com/raomaiping/map-demo' },
    ],
    sidebar: {
      '/open-layers/': OpenLayers,
      '/leaflet/': LeafLet,
    },
    lastUpdatedText: '最近更新时间',
  },
  vite: {
    build: {
      sourcemap: false,
      minify: 'terser',
      chunkSizeWarningLimit: 1500,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split('/')
              : []
            const fileName =
              facadeModuleId[facadeModuleId.length - 2] || '[name]'
            return `js/${fileName}/[name].[hash].js`
          },
        },
      },
    },
  },
}
