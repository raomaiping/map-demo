import DefaultTheme from 'vitepress/theme'
import 'element-plus/dist/index.css'
import 'ol/ol.css'
import 'leaflet/dist/leaflet.css'
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData, isServer }) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    import('element-plus').then((module) => {
      app.use(module)
    })
  },
}
