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

<style src="@/styles/home/home-boxes.scss" lang="scss" scoped></style>