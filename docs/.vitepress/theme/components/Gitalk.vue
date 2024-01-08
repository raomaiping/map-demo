<script setup>
import { onMounted } from 'vue'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

onMounted(() => {
  const gitalk = new Gitalk({
    clientID: '0154571a205dc5aba796',
    clientSecret: 'e6d101342222cb0c6e06ee24c4576c59cb28de43',
    repo: 'map-demo',
    owner: 'raomaiping',
    admin: [],
    id: location.pathname, // Ensure uniqueness and length less than 50
    distractionFreeMode: false, // Facebook-like distraction free mode
  })

  gitalk.render('gitalk-container')
})
</script>

<template>
  <div id="gitalk-container"></div>
</template>

<style scoped></style>
