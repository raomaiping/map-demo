import { h, watch } from 'vue'
import { useData, EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'element-plus/dist/index.css'
import 'ol/ol.css'
import 'leaflet/dist/leaflet.css'
import './style.css'
import AsideSponsors from './components/AsideSponsors.vue'
import DocFooter from './components/DocFooter.vue'
import NavVisitor from './components/NavVisitor.vue'
import Gitalk from './components/Gitalk.vue'

if (typeof window !== 'undefined') {
  /* 删除浏览器中的缓存 */
  if ('caches' in window) {
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          return caches.delete(key)
        })
      )
    })
  }
}
export default {
  extends: DefaultTheme,
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(DefaultTheme.Layout, props, {
      /**
       * 相关插槽
       * https://vitepress.dev/guide/extending-default-theme#layout-slots
       * https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/Layout.vue
       */
      'nav-bar-title-after': () => h(NavVisitor),
      'aside-outline-after': () => h(AsideSponsors),
      'doc-after': () => h(DocFooter),
      'doc-footer-before': () => h(Gitalk),
    })
  },
  enhanceApp: async ({
    app,
    router,
    siteData,
  }: EnhanceAppContext): Promise<void> => {
    app.provide('DEV', process.env.NODE_ENV === 'development')
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
