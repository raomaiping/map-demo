:::demo 渲染单张图片的矢量图层，点击 `按钮` 给图层设置背景。
```vue
<template>
  <div id="map" ref="map"></div>
  <el-button type="primary" class="btn" @click="setBackgroundImage"
    >{{isSetBackground ? '取消背景' : '设置背景'}}</el-button
  >
</template>

<script>
import { ref, onMounted, defineComponent } from 'vue'
import { Map, View } from 'ol'
import { Projection } from 'ol/proj'
import { Image } from 'ol/layer'
import { ImageStatic } from 'ol/source'
import { getCenter } from 'ol/extent'
export default defineComponent({
  name: 'SetBackground',
  setup() {
        // 单张图片的矢量图层
        const map = ref(null)
        const isSetBackground = ref(false)
        const initMap = () => {
            const extent = [0, 0, 1024, 968] //表示图片的尺寸
            const projection = new Projection({
                code: 'EPSG:3857',
                extent,
            })
            const imageLayer = new Image({
                source: new ImageStatic({
                // 设置版权
                attributions: '<a href="https://juejin.cn/user/588993965598407" target="_blank">&copy; 前端小菜鸟吖</a>', 
                url: 'https://www.raomaiping.host/images/world6.jpg',
                projection,
                imageExtent: extent,
                }),
            })
            const map = new Map({
                //初始化map
                target: 'map',
                layers: [imageLayer],
                view: new View({
                projection,
                center: getCenter(extent),
                zoom: 2,
                }),
            })
        }
        const setBackgroundImage = () => {
            console.log(isSetBackground.value);
            if(isSetBackground.value){
                map.value.style.backgroundImage = ''
            }else{
                map.value.style.backgroundImage = 'url(https://q2.qlogo.cn/headimg_dl?dst_uin=2582395486&spec=100)'
            }
            isSetBackground.value = !isSetBackground.value
        }
        onMounted(() => {
            initMap()
        })
    return {
       setBackgroundImage,
       map,
       isSetBackground
    }
  }
})
</script>

<style scoped>
#map {
  width:650px;
  height:650px;
}
.btn {
  position: absolute;
  top: 30px;
  right: 20px;
}
</style>
```
:::

