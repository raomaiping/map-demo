import DefaultTheme from 'vitepress/theme'
import { EnhanceAppContext } from 'vitepress'
import 'element-plus/dist/index.css'
import 'ol/ol.css'
import 'leaflet/dist/leaflet.css'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData }: EnhanceAppContext): Promise<void> => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    import('element-plus').then((module) => {
      app.use(module)
    })
    app.mixin({
      mounted() {
        import('leaflet').then((L) => {
          if (L.Icon.Default.imagePath === '/image/') return
          // 修改 leaflet icon 默认路径
          L.Icon.Default.imagePath = '/image/'
        })
      },
    })
  },
}
