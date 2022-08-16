<template>
    <div id="map" ref="map">
        <el-button type="primary" class="btn" @click="setBackgroundImage">
            {{ isSetBackgroundImage ? '取消背景' : '设置背景' }}
        </el-button>
    </div>
</template>

<script setup>
import 'ol/ol.css'
import { onMounted, ref } from 'vue'
import { Map, View } from 'ol'
import { Projection } from 'ol/proj'
import { Image } from 'ol/layer'
import { ImageStatic } from 'ol/source'
import { getCenter } from 'ol/extent'

// 单张图片的矢量图层
const map = ref(null)
const isSetBackgroundImage = ref(false)
const initMap = () => {
    const extent = [0, 0, 1024, 968] //表示图片的尺寸
    const projection = new Projection({
        code: 'EPSG:3857',
        extent,
    })
    var imageLayer = new Image({
        source: new ImageStatic({
            attributions: '<a href="https://juejin.cn/user/588993965598407" target="_blank">&copy; 前端小菜鸟吖</a>',
            url: 'https://www.raomaiping.host/images/world6.jpg',
            projection,
            imageExtent: extent,
        }),
    })
    new Map({
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
    if (isSetBackgroundImage.value) {
        map.value.style.backgroundImage = ''
    } else {
        map.value.style.backgroundImage = 'url("https://q2.qlogo.cn/headimg_dl?dst_uin=2582395486&spec=100")'
    }
    isSetBackgroundImage.value = !isSetBackgroundImage.value
}
onMounted(() => {
    initMap()
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
    position: relative;
    width: 650px;
    height: 650px;

}

.btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
}
</style>
