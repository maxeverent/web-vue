<template>
    <div style="height: 500px">
        <div class="authBox">
            <h2 class="h2-auth-boxes">Вход</h2>
            <div class="inputs-auth">
                <input class="auth-input" type="text" placeholder="username" v-model="login">
                <input class="auth-input" type="password" placeholder="password" v-model="password">
            </div>
            <button class="auth-btn" @click="setLogin()">Вход</button>
            <button class="auth-btn" @click="$router.push('/reg/Регистрация')">Регистрация</button>
            <p style="color: red; text-align: center; margin-top: 35px">{{ error }}</p>
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
            error: '', 
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
            .then(async (response) => {
                sessionStorage.setItem("auth_token", response.data.token)
                if (!(sessionStorage.getItem("user"))) {
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
                            sessionStorage.setItem("user", true)
                            sessionStorage.setItem("admin", false)
                            if (response.data.message != 'нет прав') {
                                this.authAdmin = true
                                sessionStorage.setItem("admin", true)
                            }
                        }
                        console.log(this.authUser)
                    }))
                    .catch((error) => {
                        console.log(error)
                    })
                } 
                this.error = '' 
                this.$router.push('/')
            })
            .catch((error) => {
                this.error = error.response.data.message          
            })
        }
    },
}

</script>

<style src="@/styles/auth/auth.scss" lang="scss" scoped></style>
