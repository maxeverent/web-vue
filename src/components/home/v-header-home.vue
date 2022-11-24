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
                    <li @click="$router.push('/reception/Reception')" class="item">Записаться</li>
                    <li @click="$router.push('/getRec/Receptions')" class="item">Посмотреть записи</li>
                    <button v-if="authUser === true" class="auth" @click="exit()">Выход</button>
                    <button v-else class="auth" @click="$router.push('/auth/Auth')">Вход</button>
                    <button v-if="authUser === false" class="auth" @click="$router.push('/reg/Reg')">Регистрация</button>                    
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
        window.location = '/' 
    },
  }
}
</script>

<style src="@/styles/home/main-header.scss" lang="scss" scoped></style>