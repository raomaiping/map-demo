<script setup>
// 解决打包错误 (window is not defined)
// VuePress 是在Node.js 服务端渲染，node没有window，所以报错ReferenceError: window is not defined
import { shallowRef, onMounted } from 'vue'    
const mapComponent = shallowRef(null)
onMounted(()=>{
    import('./index.vue').then(module => {
      mapComponent.value = module.default
    })
})
</script>
# 导出图片

::: tip
导出图片示例。
:::

<component v-if="mapComponent" :is="mapComponent"></component>

## 代码如下:

::: details 点我查看代码

<<< @/leaflet/map-operation/export-image/index.vue

:::

## 参考文档:

[leaflet.browser.print](https://github.com/Igor-Vladyka/leaflet.browser.print)

[dom-to-image](https://github.com/tsayen/dom-to-image)

