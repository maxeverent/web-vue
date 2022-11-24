<template>
    <div class="header">
        <div class="nav-bar">
            <div class="header-img">
                <img src="~@/assets/logo.png" alt="">
            </div>
            <div class="header-items">
                <ul class="items">
                    <li @click="$router.push('/')" class="item">Главная</li>
                    <li @click="$router.push('/doctors/Doctors')" class="item">Доктора</li>
                    <li @click="$router.push('/cabinets/Cabinets')" class="item">Кабинеты</li>
                    <li @click="$router.push('/reception/Reception')" class="item">Запись</li>
                    <li @click="$router.push('/getRec/Receptions')" class="item">Посмотреть записи</li>
                    <button v-if="authUser === true" class="auth" @click="exit()">Выход</button>
                    <template v-else>
                        <button @click="$router.push('/auth/Auth')" class="auth" >Вход</button>
                        <button class="auth" @click="$router.push('/reg/Reg')">Регистрация</button>
                    </template>                    
                </ul>
            </div>
        </div>
        <div class="header-content">
            <div class="header-text">
                <h1 style="padding-top:25px; padding-bottom: 45px;">{{$route.params.name}}</h1>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'allHeader',
  components: {
  },
  data() {
    return {
        authUser: null,
        authAdmin: null,
    }
  },
  methods: {
    exit() {
        sessionStorage.removeItem("auth_token")
        window.location = '/' 
    },
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
            console.log(this.authUser)
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

<style src="../styles/header.scss" lang="scss" scoped></style>