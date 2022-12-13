<template>
    <HomeHeader 
        :authUser='authUser'
        :authAdmin='authAdmin'  
        >
    </HomeHeader>
    <HomeBoxes/>
    <HomeDepartaments/>
</template>

<script>

import HomeHeader from './v-header-home.vue'
import HomeBoxes from '../home/v-home-boxes.vue'
import HomeDepartaments from '../home/v-departaments.vue'

export default {
    name: 'VHome',
    components: {
        HomeHeader,
        HomeBoxes,
        HomeDepartaments,
    },
    data() {
        return {
            authUser: sessionStorage.getItem("user"),
            authAdmin: sessionStorage.getItem("admin"),
        }
    },
    methods: {
    },
}

</script>

<style>
    html {
        width:100vw;
        overflow-x:hidden;
    }
</style>