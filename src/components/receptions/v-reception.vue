<template>
    <div class="wrapper">
        <div class="speciality" v-if="page == 1">
            <div class="table">
                <label class="table-title">Reception</label>
                <div class="nav-rec">
                    <button @click="next(page)" class="btn-next-back">Далее</button>
                </div>
                <div class="doctor-select">
                    <div class="doctors">
                        <label class="title">Выберите специальность: {{selectedSpec}}</label>
                        <button 
                            v-for="spec, key in speciality" 
                            :key="key" 
                            @click="selectSpec(spec.name)" 
                            class="doctor-item"
                            >{{spec.name}}</button>
                        <label class="error">{{error}}</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="doctor" v-if="page == 2">
            <div class="table">
                <label class="table-title">Reception</label>
                <div class="nav-rec">
                    <button @click="back" class="btn-next-back">Назад</button>
                    <button @click="next(page)" class="btn-next-back">Далее</button>
                </div>
                <div class="doctor-select">
                    <div class="doctors">
                        <label class="title">Выберите доктора: {{selectedDoc}}</label>
                        <button 
                            v-for="doc, key in doctor" 
                            :key="key" 
                            @click="selectDoc(doc)"
                            class="doctor-item"
                            >{{doc.fname + ' ' + doc.fname + ' ' + doc.patronymic}}</button>
                        <label class="error">{{error}}</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="date" v-if="page == 3">
            <div class="table">
                <label class="table-title">Reception</label>
                <label>Выберите дату: {{selectedDate}}</label>
                <div style="display: flex; justify-content: space-between;">
                    <vCalendar @date="date"></vCalendar>
                    <div class="free-date">
                        <div class="date-items">
                            <button @click="getFreeDate(doc.id, selectedDate)">Получить свободное время</button>
                            <label>Свободное время:</label>
                            <button v-for="date, key in freeDate" :key="key" @click="selectDate(date)" class="date-item">{{date}}</button>
                        </div>
                    </div>
                </div>
                <div>
                    <button @click="back">Назад</button>
                    <button>Далее</button>
                    <button @click="reception">Записаться</button>
                </div>
            </div>
        </div>           
    </div>
</template>

<script>

import vCalendar from '../receptions/v-calendar.vue'

import axios from 'axios'

export default {
    data() {
        return {
            page: 1,
            error: ' ',
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
        next(page) {
            if (page == 1) {
                if (this.selectedSpec == '') {
                    this.error = 'Выберите специальность'
                } else {
                    this.page = this.page + 1
                }
            }
            if (page == 2) {
                if (this.selectedDoc == '') {
                    this.error = 'Выберите доктора'
                } else {
                    this.page = this.page + 1
                }
            }
        },
        back() {
            this.page = this.page - 1
        },
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
            this.error = ''
        },
        selectDoc(doc) {
            this.selectedDoc = doc.fname + ' ' + doc.fname + ' ' + doc.patronymic
            this.doc = doc
            this.error = ''
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

.nav-rec {
    display: flex;
    justify-content: space-between;
}

.speciality {
    width: 100%;
}

.doctor-select {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
}

.doctors {
    display: flex;
    width: 100%;
    flex-direction: column;
}

.title {
    margin-left: auto;
    margin-right: auto;
    font-size: 25px;
}

.doctor-item {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    margin-bottom: 25px;
    width: 300px;
    height: 50px;
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

.btn-next-back {
    width: 20%;
    border-radius: 20px;
    border: none;
    height: 50px;
    color: white;
    font-family: 'Raleway', sans-serif;
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

.error {
    color: red;
    text-align: center;
    width: 50%;
    margin-top: 15px;
    margin-bottom: 25px;
    margin-left: auto;
    margin-right: auto;
}

.rception {
    display: flex;
}

.date-items {
    display: flex;
    flex-direction: column;
    margin-left: 10%;
}

.time {
    display: flex;
    flex-wrap: wrap;
}

.date-item {
    margin-top: 15px;
    width: 200px;
    height: 50px;
    margin-right: 150px;
    border-radius: 20px;
    border: none;
    color: white;
    font-family: 'Raleway', sans-serif;
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