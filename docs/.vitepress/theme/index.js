import DefaultTheme from "vitepress/theme";
import { registerComponents } from './register-components'
import "element-plus/dist/index.css";
// 代码示例组件主题样式
import 'vitepress-theme-demoblock/theme/styles/index.css'
// ol 样式
import "ol/ol.css";
// 自定义样式
import './style/index.css'
export default {
    ...DefaultTheme,
    enhanceApp: async ({ app, router, siteData, isServer }) => {
        // app is the Vue 3 app instance from `createApp()`. router is VitePress'
        // custom router. `siteData`` is a `ref`` of current site-level metadata.

        import("element-plus").then((module) => {
            app.use(module);
        });
        registerComponents(app)
    },
};
