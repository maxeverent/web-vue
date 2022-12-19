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
                <button @click="next()" class="btn-next-back">Далее</button>
                <div class="doctor-select">
                    <div class="doctors">
                        <label class="title">Выберите специальности:</label>
                        <div style="display: flex">
                            <vSpeciality 
                                v-for="spec, key in selectedSpec" 
                                :key="key" 
                                :speciality="spec" 
                                :id="key" 
                                @deleteSpec="deleteSpec"
                            ></vSpeciality>
                        </div>
                        <button 
                            v-for="spec, key in speciality" 
                            :key="key" 
                            @click="selectSpec(spec.name)" 
                            class="doctor-item"
                        >{{spec.name}}</button>
                        <p class="error">{{ error }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="doctor" v-if="page == 2">
            <div class="table">
                <label class="table-title">Запись</label>
                <div style="display: flex; flex-direction: column;">
                    <button @click="back" class="btn-next-back">Назад</button>
                    <label style="margin-top: 10px; font-size: 20px;">Выберите дату: {{selectedDate}}</label>
                </div>
                <div>
                    <vCalendar @date="date"></vCalendar>
                    <p class="error">{{ error }}</p>
                </div>
                <button @click="create()" class="create">Записаться</button>
            </div>
         </div>
    </div>         
</template>

<script>

import vSpeciality from './v-speciality.vue'
import vCalendar from './v-calendar.vue'

import axios from 'axios'

export default {
    data() {
        return {
            popUpStatus: false,
            page: 1,
            authUser: 'true',
            speciality: [],
            selectedSpec: [],
            doctors: [],
            selectedDate: '',
            error: '',
        }
    },
    components: {
        vSpeciality,
        vCalendar,
    },
    methods: {
        next() {
            if (this.selectedSpec.length !== 0) {
                this.page = this.page + 1
                this.error = ''
            } else {
                this.error = 'Выберите'
            }
        },
        back() {
            this.page = this.page - 1
            this.error = ''
        },
        date(data) {
            if (data == false) {
                this.error = 'Запись только на пн, ср, пт'
            } else {
                this.selectedDate = data[0] + ' ' + data[1] + ' ' + '22'
                this.error = ''
            }
        },
        async create() {
            if (this.selectedDate == '') {
                this.error = 'Выберите время'
            }
            else {
                const exam = {
                    speciality: this.selectedSpec,
                    date: this.selectedDate,
                }
                await axios({
                    method: "POST",
                    url: "http://localhost:5000/exam/create",
                    headers: {'Authorization': "Bearer " + sessionStorage.getItem("auth_token")},
                    data: exam
                })
                .then(response => console.log(response))
                .catch(err => console.log(err))
            }
            this.$router.push('/getRec/Записи')
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
                this.error = ''
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
                    this.error = ''
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