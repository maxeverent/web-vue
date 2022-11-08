<template>
    <div class="header">
        <div class="nav-bar">
            <div class="header-img">
                <img src="~@/assets/logo.png" alt="">
            </div>
            <div class="header-items">
                <ul class="items">
                    <li @click="$router.push('/')" class="item">Home</li>
                    <li @click="$router.push('/doctors')" class="item">Doctors</li>
                    <li @click="$router.push('/cabinets')" class="item">Cabinets</li>
                    <li @click="$router.push('/reception')" class="item">Reception</li>
                    <li class="item">Contact</li>
                    <button v-if="authUser === true" class="auth" @click="exit()">Выход</button>
                    <button v-else class="auth" @click="$router.push('/auth')">Вход</button>
                    <button v-if="authUser === false" class="auth" @click="$router.push('/reg')">Регистрация</button>                    
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
  props: ['authUser', 'authAdmin'],   
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

<style>

   @font-face {
        font-family: "Raleway";
        src: url(../../fonts/Raleway/Raleway-VariableFont_wght.ttf) format("woff2"), 
        url(../../fonts/Raleway/Raleway-Italic-VariableFont_wght.ttf) format("woff2")
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
        cursor: pointer;
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
        cursor: pointer;
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