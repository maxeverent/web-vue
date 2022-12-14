<template>
  <div id="app">
    <router-view></router-view>
    <vFooter></vFooter>
  </div>
</template>

<script>

import vFooter from './components/v-footer.vue'

export default {
  name: 'App',
  components: { vFooter },
}
</script>

<style>
#app {
  padding: 0;
  margin: 0;
  font-family: 'Raleway', sans-serif;
  color: #404040;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.8;
}

*{
  padding: 0;
  margin: 0;
}
</style>
