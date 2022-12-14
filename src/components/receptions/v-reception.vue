<template>
    <vPopUp 
        v-if="popUpStatus"
        @cancel="cancel"
        :reception="{fname: this.doc.fname, sname: this.doc.sname, patronymic: this.doc.patronymic, spec: selectedSpec, date: this.selectedDate}"
    ></vPopUp>
    <div class="wrapper" v-if="authUser == 'true'">
        <div class="speciality" v-if="page == 1">
            <div class="table">
                <label class="table-title">Запись</label>
                <div class="doctor-select">
                    <div class="doctors">
                        <label class="title">Выберите специальность: {{selectedSpec}}</label>
                        <button 
                            v-for="spec, key in speciality" 
                            :key="key" 
                            @click="selectSpec(spec.name)" 
                            class="doctor-item"
                        >{{spec.name}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="doctor" v-if="page == 2">
            <div class="table">
                <label class="table-title">Запись</label>
                <div class="nav-rec">
                    <button @click="back" class="btn-next-back">Назад</button>
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
                    </div>
                </div>
            </div>
        </div>
        <div class="date" v-if="page == 3">
            <div class="table">
                <label class="table-title">Запись</label>
                <div style="display: flex; flex-direction: column;">
                    <button @click="back" class="btn-next-back">Назад</button>
                    <label style="margin-top: 10px; font-size: 20px;">Выберите дату: {{selectedDate}}</label>
                </div>
                <div>
                    <vCalendar @date="date"></vCalendar>
                    <div class="free-date">
                        <div class="date-items">
                            <div style="display:flex; flex-direction:column">
                                <p>Свободное время:</p>
                            </div>
                            <div class="date">
                                <div class="items">
                                    <button 
                                        v-for="date, key in freeDate" 
                                        :key="key" @click="selectDate(date)" 
                                        class="date-item"
                                    >{{date}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>           
    </div>
    <div v-else class="wrapper">
        <div class="table">
            <label class="table-title">Запись</label>
            <h1>Зарегистрируйтесь</h1>
        </div>
    </div>
</template>

<script>

import vCalendar from '../receptions/v-calendar.vue'
import vPopUp from '../receptions/v-pop-up.vue'

import axios from 'axios'

export default {
    data() {
        return {
            authUser: sessionStorage.getItem("user"),
            authAdmin: sessionStorage.getItem("admin"),
            page: 1,
            selectedSpec: '',
            selectedDoc: '',
            selectedDate: '',
            speciality: [],  
            doctor: [],
            doc: [],
            freeDate: [],
            recStatus: false,
            popUpStatus: false,
        }
    },
    name: 'vReceptions',
    components: { 
        vCalendar,
        vPopUp,
    },
    methods: {
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
            this.page = this.page + 1
            this.loadDoctor()
        },
        selectDoc(doc) {
            this.doc = doc
            this.page = this.page + 1
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
            this.recStatus = true
        },
        selectDate(date) {
            if (this.selectedDate.split(' ').length == 3) {
                this.selectedDate = this.selectedDate + ' ' + date 
            }  
            else { 
                const selectDate =  this.selectedDate.split(' ')
                this.selectedDate = selectDate[0] + ' ' + selectDate[1] + ' ' + selectDate[2] + ' ' + date
            }
            this.reception()
        },
        async reception() {
            if (this.selectedDate.split(' ').length == 4) {
                this.popUpStatus = true
                this.errorRec = ' '
            } else {
                this.errorRec = 'Выберите время'
            } 
        },
        date(data) {
            this.selectedDate = data[0] + ' ' + data[1] + ' ' + '22'
            this.getFreeDate(this.doc.id, this.selectedDate)
        },
        cancel(data) {
            this.popUpStatus = data.popUpStatus
        },
    },
    created() {
        this.loadSpeciality() 
    }
}

</script>

<style src="@/styles/receptions/receptions.scss" lang="scss" scoped></style>