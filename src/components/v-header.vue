<template>
    <div class="header">
        <div class="nav-bar">
            <div class="header-img">
                <img src="~@/assets/logo.png" alt="">
            </div>
            <div class="header-items">
                <ul class="items">
                    <li @click="$router.push('/')" class="item">Главная</li>
                    <li @click="$router.push('/doctors/Доктора')" class="item">Доктора</li>
                    <li @click="$router.push('/cabinets/Кабинеты')" class="item">Кабинеты</li>
                    <li @click="$router.push('/reception/Запись')" class="item">Запись</li>
                    <li v-if="authUser == 'true'" @click="$router.push('/exam/Медосмотр')" class="item">Медосмотр</li>
                    <li v-if="authUser == 'true'" @click="$router.push('/getRec/Записи')" class="item">Посмотреть записи</li>
                    <button v-if="authUser == 'true'" class="auth" @click="exit()">Выход</button>
                    <template v-else>
                        <button @click="$router.push('/auth/Вход')" class="auth" >Вход</button>
                        <button class="auth" @click="$router.push('/reg/Регистрация')">Регистрация</button>
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

export default {
  name: 'allHeader',
  components: {
  },
  data() {
    return {
        authUser: sessionStorage.getItem("user"),
        authAdmin: sessionStorage.getItem("admin"),
    }
  },
  methods: {
    exit() {
        sessionStorage.removeItem("auth_token")
        sessionStorage.removeItem("admin")
        sessionStorage.removeItem("user")
        window.location = '/' 
    },
  },
}

</script>

<style src="../styles/header.scss" lang="scss" scoped></style>