<script setup>
// 解决打包错误 (document is not defined)
// VuePress 是在Node.js 服务端渲染，node没有window，所以报错ReferenceError: document is not defined
import { shallowRef, onMounted } from 'vue'    
const mapComponent = shallowRef(null)
onMounted(()=>{
    import('./index.vue').then(module => {
      mapComponent.value = module.default
    })
})
</script>
# KML

::: tip
加载 `KML` 数据
:::

<component v-if="mapComponent" :is="mapComponent"></component>

## 代码如下:

::: details 点我查看代码

<<< @/open-layers/third-party-map-display/kml/index.vue

:::