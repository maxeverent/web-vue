<template>
    <div class="wrapper">
        <div>
            <label>{{selectedSpec}}</label>
            <button v-for="spec, key in speciality" :key="key" @click="selectSpec(spec.name)">{{spec.name}}</button>
        </div>
        <div>
            <label>{{selectedDoc}}</label>
            <button v-for="doc, key in doctor" :key="key" @click="selectDoc(doc)">{{doc.fname + ' ' + doc.fname + ' ' + doc.patronymic}}</button>
        </div>
        <div>
            <label>{{selectedDate}}</label>
            <vCalendar @date="date"></vCalendar>
            <button @click="getFreeDate(doc.id, selectedDate)">Получить свободное время</button>
            <button v-for="date, key in freeDate" :key="key" @click="selectDate(date)">{{date}}</button>
        </div>
        <div>
            <button @click="reception">Записаться</button>
        </div>
    </div>
</template>

<script>

import vCalendar from '../receptions/v-calendar.vue'

import axios from 'axios'

export default {
    data() {
        return {
            selectedSpec: '',
            selectedDoc: '',
            selectedDate: '',
            speciality: [],  
            doctor: [],
            doc: [],
            freeDate: [], 
        }
    },
    name: 'vReceptions',
    components: { vCalendar },
    methods: {
        async loadSpeciality() {
            await axios({url: "http://localhost:5000/speciality/get"})
                .then(response => {
                    console.log(response)
                    this.speciality = response.data
                    console.log(this.speciality)
                })
                .catch(err => console.log(err))     
        },
        async loadDoctor() {
            await axios({url: "http://localhost:5000/doctor/get"})
                .then(response => {
                    console.log(response)
                    const doctor = response.data
                    this.doctor = []
                    for (let i = 0; i < doctor.length; ++i) {
                        if (doctor[i].speciality == this.selectedSpec) {
                            this.doctor.push(doctor[i])
                        }
                    }
                    console.log(this.doctor)
                })
                .catch(err => console.log(err))     
        },
        selectSpec(spec) {
            this.selectedSpec = spec
            this.loadDoctor()
        },
        selectDoc(doc) {
            this.selectedDoc = doc.fname + ' ' + doc.fname + ' ' + doc.patronymic
            this.doc = doc
        },
        async getFreeDate(doc, selectedDate) {
            console.log(doc, selectedDate)
            await axios({
                    method: "GET",
                    url: "http://localhost:5000/reception/getfreedate/" + doc + "/" + selectedDate,
                })
                .then(response => {
                    console.log(response)
                    this.freeDate = response.data
                    console.log(this.freeDate)
                })
                .catch(err => console.log(err))  
        },
        selectDate(date) {
            this.selectedDate = this.selectedDate + ' ' + date
        },
        async reception() {
            await axios({
                    method: "POST",
                    url: "http://localhost:5000/reception/create/",
                    headers: {'Authorization': "Bearer " + sessionStorage.getItem("auth_token")},
                    data: {
                        fname: this.doc.fname,
                        sname: this.doc.sname,
                        patronymic: this.doc.patronymic,
                        doctor_id: Number(this.doc.id),
                        date: this.selectedDate,
                    }
                })
                .then(response => {
                    console.log(response)
                })
                .catch(err => console.log(err))  
        },
        date(data) {
            this.selectedDate = data[0] + ' ' + data[1] + ' ' + '22'
        }
    },
    created() {
        this.loadSpeciality()
    }
}

</script>

<style>

</style>