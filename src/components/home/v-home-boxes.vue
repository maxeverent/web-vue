<template>
    <div class="home-boxes">
        <div class="hours">
            <h2 class="h2-home-boxes">Opening Hours</h2>
            <ul class="boxes-items">
                <li class="boxes-item">Monday-Thrusday<span>8.00-19.00</span></li>
                <li class="boxes-item">Friday<span>8.00-18.30</span></li>
                <li class="boxes-item">Saturday<span>8.00-17.00</span></li>
                <li class="boxes-item">Sunday<span>8.00-15.00</span></li>
            </ul>
        </div>
        <div class="phone">
            <h2 class="h2-home-boxes">Emergency</h2>
            <button class="phone-number">+34 586 778 8892</button>
            <p>Call</p>
        </div>
        <div class="back-call">
            <h2 class="h2-home-boxes">Back Call</h2>
            <div class="inputs-back-call">
                <input class="back-call-input" type="text" placeholder="Name">
                <input class="back-call-input" type="text" placeholder="Phone Number">
            </div>
            <button class="back-call-btn">Back Call</button>
        </div>
    </div>
</template>

<script>

export default {
  name: 'HomeBoxes',
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

    .home-boxes {
        display: flex;  
        width: 60%;
        padding: 80px;
        margin-left: auto;
        margin-right: auto;
    }

    .hours {
        position: relative;
        border-radius: 20px;
        border: 2px solid #dde4ea;
        padding: 15px;
        border-color: #18a3eb;
        width: 30%;
    }

    .phone {
        margin-left: 30px;
        width: 20%;
        position: relative;
        border-radius: 20px;
        border: 2px solid #dde4ea;
        padding: 32px;
        border-color: #18a3eb;
    }

    .back-call {
        margin-left: 30px;
        width: 50%;
        position: relative;
        border-radius: 20px;
        border: 2px solid #dde4ea;
        padding: 32px;
        border-color: #18a3eb;
    }

    .h2-home-boxes {
        position: absolute;
        top: -24px;
        left: -2px;
        padding-right: 16px;
        background: #fff;
        height: 48px;
    }

    .boxes-items {
        padding: 5px
    }

    .boxes-item {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        font-size: 16px;
        font-weight: 500;
        color: #828282;
    }

    .back-call-btn {
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

    .inputs-back-call {
        display: flex;
        flex-direction: column;
    }

    .back-call-input {
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