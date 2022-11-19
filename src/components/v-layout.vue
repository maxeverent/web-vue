<template>
    <vHeader class="header"></vHeader>
    <router-view></router-view>
</template>

<script>

import vHeader from './v-header.vue'

export default {
    data() {
        return {

        }
    },
    components: { vHeader },
    
}

</script>

<style>

.header {
    position: relative;
    z-index: 1;
}

</style>