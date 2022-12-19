<template>
    <div class="wrapper">
        <div class="table">
            <label class="table-title">Записи</label>
            <template v-if="receptions.length != 0">
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
            </template>
            <p v-else style="font-size: 23px; text-align: center; margin-top: 5px;">Записей нет</p>
        </div>
        <div class="table">
            <label class="table-title" style="width: 240px">Мед. осмотры</label>
            <template v-if="exams.length != 0">
                <table style="margin-left: auto; margin-right: auto;">
                    <tr>
                        <th>Специальности</th>
                        <th>Дата</th>
                    </tr>
                    <vExam 
                        v-for="exam, key in exams" 
                        :exams="exam"
                        :key="key"
                    ></vExam>
                </table>
            </template>
            <p v-else style="font-size: 23px; text-align: center; margin-top: 5px;">Записей нет</p>
        </div>
    </div>
</template>

<script>

import vReception from './v-reception.vue'
import vExam from './v-exam.vue'

import axios from 'axios'

export default {
    data() {
        return {
            receptions: [],
            exams: []
        }
    },
    components: { 
        vReception,
        vExam,
    },
    methods: {
        async getReceptions() {           
            await axios({
                method: "GET",
                url: "http://localhost:5000/reception/get",
                headers: {'Authorization': "Bearer " + sessionStorage.getItem("auth_token")},
            }).then(result => this.receptions = result.data).catch(err => console.log(err))
            console.log(this.receptions)
        },
        async getExams() {           
            await axios({
                method: "GET",
                url: "http://localhost:5000/exam/get",
                headers: {'Authorization': "Bearer " + sessionStorage.getItem("auth_token")},
            })
            .then(result => this.exams = result.data)
            .catch(err => console.log(err))
            console.log(this.exams)
        }
    },
    created() {
        this.getReceptions()
        this.getExams()
    }
}

</script>

<style src="@/styles/allrceptions/receptions.scss" lang="scss" scoped></style>