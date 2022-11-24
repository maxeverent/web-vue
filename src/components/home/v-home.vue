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

import axios from 'axios'

export default {
    name: 'VHome',
    components: {
        HomeHeader,
        HomeBoxes,
        HomeDepartaments,
    },
    data() {
        return {
            authUser: false,
            authAdmin: false,
            admin_token: "dea957e17a45886df204fd062f432d3dc7fabc8b",
        }
    },
    methods: {
        async loadHome() {
            await axios({
                method: "GET",
                headers: {'Authorization': "Bearer " + sessionStorage.getItem("auth_token")},
                url: "http://localhost:5000/auth/users/"
            })
            .then((response => {
                console.log(response)
                if (response.status === 200) {
                    this.authUser = true
                    this.authAdmin = false
                    if (response.data.message != 'нет прав') {
                        this.authAdmin = true
                    }
                }
            }))
            .catch((error) => {
                console.log(error)
            })
        }
    },
    created() {
        this.loadHome()
    }
}

</script>

<style>
    html {
        width:100vw;
        overflow-x:hidden;
    }
</style>