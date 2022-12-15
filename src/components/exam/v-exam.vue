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
                <button @click="next()">Далее</button>
                <div class="doctor-select">
                    <div class="doctors">
                        <label class="title">Выберите специальности:</label>
                        <div style="display: flex">
                            <vSpeciality v-for="spec, key in selectedSpec" :key="key" :id="key" :spec = spec @deleteSpec="deleteSpec"></vSpeciality>
                        </div>
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

import vSpeciality from './v-speciality.vue'

import axios from 'axios'

export default {
    data() {
        return {
            popUpStatus: false,
            page: 1,
            authUser: 'true',
            speciality: [],
            selectedSpec: [],
            doctors: []
        }
    },
    components: {
        vSpeciality
    },
    methods: {
        next() {
            if (this.selectedSpec.length !== 0) {
                this.page = this.page + 1
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
                    this.doctors = response.data
                    console.log(this.doctors)
                })
                .catch(err => console.log(err))
        },
        selectSpec(spec) {
            if (this.selectedSpec.length == 0) {
                this.selectedSpec.push(spec)
            }
            else {
                let j = 0
                for (let i = 0; i < this.selectedSpec.length; i++) {
                    if (this.selectedSpec[i] == spec) {
                        j++
                        break
                    }
                }
                if (j == 0) {
                    this.selectedSpec.push(spec)
                }
            }
        },
        deleteSpec(id) {
            this.selectedSpec.splice(id, 1)
        }
    },
    created() {
        this.loadSpeciality()
        this.loadDoctor()
    }
}

</script>

<style src="@/styles/exam/exam.scss" lang="scss" scoped></style>