<template>
    <div class="header">
        <div class="nav-bar">
            <div class="header-img">
                <img src="~@/assets/logo.png" alt="">
            </div>
            <div class="header-items">
                <ul class="items">
                    <li @click="$router.push('/')" class="item">Home</li>
                    <li @click="$router.push('/doctors/Doctors')" class="item">Doctors</li>
                    <li @click="$router.push('/cabinets/Cabinets')" class="item">Cabinets</li>
                    <li @click="$router.push('/reception/Reception')" class="item">Reception</li>
                    <li class="item">Contact</li>
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
    @font-face {
        font-family: "Raleway";
        src: url(../fonts/Raleway/Raleway-VariableFont_wght.ttf) format("woff2"), 
        url(../fonts/Raleway/Raleway-Italic-VariableFont_wght.ttf) format("woff2")
    }

    p {
        font-size: 16px;
        font-weight: 500;
        line-height: 2;
        color: #828282;
    }

    h1 {
        font-size: 62px;
        font-weight: 600;
        line-height: 1.2;
        color: #404040;
    }

    .header {
        width: 100%;
        background-image: url('~@/assets/header-background.jpg');
        background-size: cover;
    }

    .nav-bar {
        display: flex;
        width: 60%;
        padding: 15px;
        margin-left: auto;
        margin-right: auto;
        justify-content: space-between;
        align-items: center;
    }

    .items {
        display: flex;
        list-style: none;
    }

    .item {
        margin: 24px;
    }

    .phone-number {
        margin: 8px;
        padding: 12px;
        border: none;
        border-radius: 20px;
        font-family: 'Raleway', sans-serif;
        color: white;
        font-size: 16px;
        font-weight: 600;
        line-height: 1.8;
        background: -moz-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* ff3.6+ */
        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(50,200,250,1)), color-stop(100%, rgba(188,125,228,1))); /* safari4+,chrome */
        background: -webkit-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* safari5.1+,chrome10+ */
        background: -o-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* opera 11.10+ */
        background: -ms-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* ie10+ */
        background: linear-gradient(270deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* w3c */
    }

    .header-content {
        display: flex;
        flex-direction: column;
        width: 60%;
        margin-left: auto;
        margin-right: auto;
    }

    .read-more {
        width: 20%;
        margin-top: 40px;
        margin-bottom: 140px;
        padding: 12px;
        border: none;
        border-radius: 20px;
        font-family: 'Raleway', sans-serif;
        color: white;
        font-size: 16px;
        font-weight: 600;
        line-height: 1.8;
        background: -moz-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* ff3.6+ */
        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(50,200,250,1)), color-stop(100%, rgba(188,125,228,1))); /* safari4+,chrome */
        background: -webkit-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* safari5.1+,chrome10+ */
        background: -o-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* opera 11.10+ */
        background: -ms-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* ie10+ */
        background: linear-gradient(270deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* w3c */
    }

    .auth {
        margin: 10px;
        margin-top: 7px;
        padding: 12px;
        border: none;
        border-radius: 20px;
        font-family: 'Raleway', sans-serif;
        color: white;
        font-size: 16px;
        font-weight: 600;
        line-height: 1.8;
        background: -moz-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* ff3.6+ */
        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(50,200,250,1)), color-stop(100%, rgba(188,125,228,1))); /* safari4+,chrome */
        background: -webkit-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* safari5.1+,chrome10+ */
        background: -o-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* opera 11.10+ */
        background: -ms-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* ie10+ */
        background: linear-gradient(270deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* w3c */
    }
</style>