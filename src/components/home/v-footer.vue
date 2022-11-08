<template>
    <div class="footer">
        <div class="footer-content">
            <div class="footer-info">
                <img src="~@/assets/logo.png" alt="">
                <p class="p-footer">Lorem ipsum dolor sit amet, consectetur adipiscing <br> elit.
                    Donec malesuada lorem maximus mauris <br> scelerisque, at rutrum nulla dictum. 
                    Ut ac ligula <br> sapien. <br></p>
                    <p class="p-footer">Copyright ©2022 All rights reserved | This template is made <br>
                        with  by Colorlib</p>
            </div>
            <div class="footer-contact">
                <h3>Contact</h3>
                <p class="p-footer">Addtress: Mitlton Str. 26-27 London UK <br>
                    Phone: +53 345 7953 32453 <br>
                    Email: yourmail@gmail.com</p>
            </div>
            <div class="footer-links">
                <h3>Links</h3>
                <a href="">Home</a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'HomeFooter',
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

    .footer {
    width: 100%;
    max-height: 400px;
    background-image: url('~@/assets/footer.png');
    background-size: cover;
    }

    .footer-content {
        padding: 45px;
        width: 60%;
        display: flex;
        justify-content: space-between;
        margin-left: auto;
        margin-right: auto;
    }

    .p-footer {
        margin-top: 25px;
    }
</style>