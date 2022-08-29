<script setup>
// 解决打包错误 (document is not defined)
// VuePress 是在Node.js 服务端渲染，node没有window，所以报错ReferenceError: document is not defined
import { ref, onMounted } from 'vue'    
import Map from './index.vue'
const mapComponent = ref(null)
onMounted(()=>{
    import('./index.vue').then(module => {
      mapComponent.value = module.default
    })
})
</script>
# 比例尺控件

::: tip
缩放地图可以看到比例尺的大小跟随着变化。
:::

<component v-if="mapComponent" :is="mapComponent"></component>

## 代码如下:

::: details 点我查看代码

<<< @/open-layers/map-controls/scale-line/index.vue

:::