<template>
    <div v-if="receptions.length == 0" class="empty-rec">
        <div class="table">
            <label class="table-title">Записи</label>
            <h1>Нет записей</h1>
        </div>
    </div>
    <div class="wrapper" v-else>
        <div class="table">
            <label class="table-title">Записи</label>
            <table>
                <tr>
                    <th>Ф. доктора</th>
                    <th>И. доктора</th>
                    <th>О. доктора</th>
                    <th>Дата</th>
                </tr>
                <vReception 
                    v-for="reception, key in receptions" 
                    :reception="reception" 
                    :key="key"
                ></vReception>
            </table>
        </div>
    </div>
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