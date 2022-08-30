<script setup>
// 解决打包错误 (window is not defined)
// VuePress 是在Node.js 服务端渲染，node没有window，所以报错ReferenceError: window is not defined
import { ref, onMounted } from 'vue'    
const mapComponent = ref(null)
onMounted(()=>{
    import('./index.vue').then(module => {
      mapComponent.value = module.default
    })
})
</script>
# 热力图

::: tip
滑动滑块改变热力图的热点半径和模糊尺寸。
:::

<component v-if="mapComponent" :is="mapComponent"></component>

## 代码如下:

::: details 点我查看代码

<<< @/open-layers/others/heatmap/index.vue

:::
