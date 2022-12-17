<template>
    <div style="height: 500px">
        <div class="regBox">
            <h2 class="h2-reg-boxes">Регистрация</h2>
            <div class="inputs-reg">
                <input class="reg-input" type="text" placeholder="username" v-model="login">
                <input class="reg-input" type="password" placeholder="password" v-model="password">
            </div>
            <button class="reg-btn" @click="setReg()">Регистрация</button>
            <button class="reg-btn" @click="$router.push('/auth/Вход')">Вход</button>
            <p style="color: red; text-align: center; margin-top: 35px">{{ error }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'VReg',
    data() {
        return {
            login: '',
            password: '',
            email: '',
            namePage: "Reg",
            authUser: false,
            authAdmin: false,  
            error: '', 
        }
    },
    methods: {
        async setReg() {
            await axios({
                method: 'post',
                url: 'http://localhost:5000/auth/reg/',
                data: {
                    username: this.login,
                    password: this.password,
                }
            })
            .then(() => {
                this.error = ''
                this.$router.push('/')
            })
            .catch((err) => this.error = err.response.data.errors.errors[0].msg)
        }
    }
}

</script>

<style src="@/styles/auth/reg.scss" lang="scss" scoped></style>