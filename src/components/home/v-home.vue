<template>
    <HomeHeader 
        :authUser='authUser'
        :authAdmin='authAdmin'  
        >
    </HomeHeader>
    <HomeBoxes/>
    <HomeDepartaments/>
    <HomeFooter/>
</template>

<script>

import HomeHeader from './v-header-home.vue'
import HomeBoxes from '../home/v-home-boxes.vue'
import HomeDepartaments from '../home/v-departaments.vue'
import HomeFooter from '../home/v-footer.vue'

import axios from 'axios'

export default {
    name: 'VHome',
    components: {
        HomeHeader,
        HomeBoxes,
        HomeDepartaments,
        HomeFooter,
    },
    data() {
        return {
            authUser: false,
            authAdmin: false,
            admin_token: "dea957e17a45886df204fd062f432d3dc7fabc8b",
        }
    },
    methods: {
        loadHome() {
            axios({
                method: "GET",
                headers: {'Authorization': "Token " + sessionStorage.getItem("auth_token")},
                url: "http://127.0.0.1:8000/api/dj-auth/"
            })
            .then((response => {
                console.log(response)
                if (response.status === 200) {
                    this.authUser = true
                }
                console.log(this.authUser)
            }))
            .catch((error) => {
                console.log(error)
            })
            if (sessionStorage.getItem("auth_token") === this.admin_token) {
                this.authAdmin = true
                console.log(this.authAdmin)
            }
        }
    },
    created() {
        this.loadHome()
    }
}

</script>

<style>

</style>