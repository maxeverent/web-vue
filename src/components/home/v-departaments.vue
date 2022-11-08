<template>
    <div class="our-departaments">
        <div class="list-departaments">
            <h1 class="h1-header-dep">Our Departaments</h1>
            <div class="list-items">
                <div class="list-item">
                    <h2 class="h2-header-dep">Cardioology</h2>
                    <p class="p-dep">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lorem maximus mauris.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'HomeDepartaments',
    components: {
    
    },
  data() {
  
  }
}
</script>

<style>
   
    @font-face {
        font-family: "Raleway";
        src: url(../../fonts/Raleway/Raleway-VariableFont_wght.ttf) format("woff2"), 
        url(../../fonts/Raleway/Raleway-Italic-VariableFont_wght.ttf) format("woff2")
    }

    .our-departaments {
    padding-top: 90px;
    padding-bottom: 90px;
    width: 100%;
    background-image: url('~@/assets/departments.jpg');
    background-size: cover;
    }

    .list-departaments {
        width: 60%;
        padding-top: 50px;
        padding-bottom: 50px;
        margin-left: auto;
        margin-right: auto;
        background: -moz-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* ff3.6+ */
        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(50,200,250,1)), color-stop(100%, rgba(188,125,228,1))); /* safari4+,chrome */
        background: -webkit-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* safari5.1+,chrome10+ */
        background: -o-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* opera 11.10+ */
        background: -ms-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* ie10+ */
        background: linear-gradient(270deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* w3c */
    }

    .list-items {
        display: flex;
        flex-wrap: wrap;
        padding: 30px;
    }

    .list-item {
        padding: 16px;
        width: 30%;
    }

    .h1-header-dep {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 30px;
        font-size: 48px;
        font-weight: 600;
        text-align: center;
        color: #fff;
    }

    .h2-header-dep {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
        color: #fff;
    }

    .p-dep {
        font-size: 14px;
        color: #fff;
    }
</style>