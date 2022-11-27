<template>
    <div class="wrapper">
        <vReception 
        v-for="reception, key in receptions" 
        :reception="reception" 
        :key="key"
    ></vReception>
    </div>
    <label v-if="receptions.length == 0">Нет записей</label>
</template>

<script>

import vReception from './v-reception.vue'

import axios from 'axios'

export default {
    data() {
        return {
            receptions: [],
        }
    },
    components: { vReception },
    methods: {
        async getReceptions() {           
            await axios({
                method: "GET",
                url: "http://localhost:5000/reception/get",
                headers: {'Authorization': "Bearer " + sessionStorage.getItem("auth_token")},
            }).then(result => this.receptions = result.data).catch(err => console.log(err))
            console.log(this.receptions)
        }
    },
    created() {
        this.getReceptions()
    }
}

</script>

<style src="@/styles/allrceptions/receptions.scss" lang="scss" scoped></style>