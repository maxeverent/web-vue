<template>
    <div style="height: 500px">
        <div class="regBox">
            <h2 class="h2-reg-boxes">Registration</h2>
            <div class="inputs-reg">
                <input class="reg-input" type="text" placeholder="username" v-model="login">
                <input class="reg-input" type="text" placeholder="password" v-model="password">
                <input class="reg-input" type="text" placeholder="email" v-model="email">
            </div>
            <button class="reg-btn" @click="setReg()">Регистрация</button>
            <button class="reg-btn" @click="$router.push('/auth')">Вход</button>
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
            .then(() => this.$router.push('/'))
        }
    }
}

</script>

<style>
    .regBox {
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

    .h2-reg-boxes {
        position: absolute;
        top: -24px;
        left: 40%;
        padding-right: 16px; 
        padding-left: 16px;
        background: #fff;
        height: 48px;
    }

    .reg-btn {
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

    .inputs-reg {
        display: flex;
        flex-direction: column;
    }

    .reg-input {
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