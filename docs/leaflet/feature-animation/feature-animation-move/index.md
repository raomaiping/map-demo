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
# 要素轨迹移动

::: tip
要素轨迹移动示例。
:::

<component v-if="mapComponent" :is="mapComponent"></component>

## 代码如下:

::: details 点我查看代码

<<< @/leaflet/feature-animation/feature-animation-move/index.vue

:::

## 参考文档:

[leaflet-polylinedecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator)

[leaflet.animatedmarker](https://github.com/openplans/Leaflet.AnimatedMarker)

[Leaflet Animated Marker](https://github.com/gisarmory/Leaflet.AnimatedMarker)