<template>
    <div style="height: 500px">
        <div class="authBox">
            <h2 class="h2-auth-boxes">Auth</h2>
            <div class="inputs-auth">
                <input class="auth-input" type="text" placeholder="username" v-model="login">
                <input class="auth-input" type="text" placeholder="password" v-model="password">
            </div>
            <button class="auth-btn" @click="setLogin()">Вход</button>
            <button class="auth-btn" @click="$router.push('/reg')">Регистрация</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'HomeAuth',
    data() {
        return {
            login: '',
            password: '',
            namePage: "Auth",
            authUser: false,
            authAdmin: false,
            admin_token: "dea957e17a45886df204fd062f432d3dc7fabc8b",
        }
    },
    methods: {
        async setLogin() {
            await axios({
                method: 'POST',
                url: "http://localhost:5000/auth/login/",
                data: {
                    username: this.login,
                    password: this.password,
                }
            })
            .then((response) => {
                sessionStorage.setItem("auth_token", response.data.token)
                this.$router.push('/')
            })
            .catch((error) => {
                console.log(error)             
            })
        }
        /*loadPage() {
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
        } */
    },
    mounted() {
        //this.loadPage()
    }
}

</script>

<style>
    @font-face {
        font-family: "Raleway";
        src: url(../../fonts/Raleway/Raleway-VariableFont_wght.ttf) format("woff2"), 
        url(../../fonts/Raleway/Raleway-Italic-VariableFont_wght.ttf) format("woff2")
    }

    .authBox {
        margin-left: auto;
        margin-right: auto;
        margin-top: 100px;
        width: 50%;
        position: relative;
        border-radius: 20px;
        border: 2px solid #dde4ea;
        padding: 32px;
        border-color: #18a3eb;
    }

    .h2-auth-boxes {
        position: absolute;
        top: -24px;
        left: 44%;
        padding-right: 16px; 
        padding-left: 16px;
        background: #fff;
        height: 48px;
    }

    .auth-btn {
        width: 95%;
        margin-top: 20px;
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

    .inputs-auth {
        display: flex;
        flex-direction: column;
    }

    .auth-input {
        color: #828282;
        background: #f0f4f8;
        outline: none;
        border: none;
        padding: 10px;
        margin-bottom: 10px;
        font-size: 16px;
        font-family: 'Raleway';
        font-style: italic;
    }

</style>