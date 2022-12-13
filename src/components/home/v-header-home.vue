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
                    <li v-if="authUser == 'true'" @click="$router.push('/getRec/Receptions')" class="item">Посмотреть записи</li>
                    <button v-if="authUser == 'true'" class="auth" @click="exit()">Выход</button>
                    <template v-else>
                        <button @click="$router.push('/auth/Auth')" class="auth" >Вход</button>
                        <button class="auth" @click="$router.push('/reg/Reg')">Регистрация</button>
                    </template>                    
                </ul>
            </div>
        </div>
        <div class="header-content">
            <div class="header-text">
                <h1 style="padding-top:25px">The Best <br>Medical Services</h1>
                <p style="padding-top:25px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Donec malesuada lorem <br> maximus mauris scelerisque, at rutrum nulla dictum. 
                Ut ac ligula sapien. <br> Suspendisse cursus faucibus finibus.</p>
            </div>
            <button class="read-more">Read More</button>
        </div>
    </div>
</template>

<script>

export default {
  name: 'HomeHeader',
  components: {
    
  },
  props: {
    authUser: Boolean,
    authAdmin: Boolean,
  },   
  data() {
    return {
    }
  },
  methods: {
    exit() {
        sessionStorage.removeItem("auth_token")
        sessionStorage.removeItem("admin")
        sessionStorage.removeItem("user")
        window.location = '/' 
    },
  }
}
</script>

<style src="@/styles/home/main-header.scss" lang="scss" scoped></style>