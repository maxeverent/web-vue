<template>
    <addPopUp v-if="addPopUpStatus" class="pop-up" :popUpStatus="addPopUpStatus" :cabinets="cabinets" @cancel="cancel" @add="addDoctor"></addPopUp>
    <editPopUp v-if="editPopUpStatus" class="pop-up" :popUpStatus="editPopUpStatus" :cabinets="cabinets" @cancel="cancel" @edit="editDoctor"></editPopUp>
    <div v-if="addPopUpStatus || editPopUpStatus" class="pop-up-wrapper"></div>
    <allHeader :namePage="namePage" :authAdmin="authAdmin" :authUser="authUser"></allHeader>
    <div class="wrapper">
        <div class="table">
            <label class="table-title">Doctors</label>
            <button @click="addPopUp()" class="add-btn">Add</button>
            <div class="column">
                <label class="column-name">Имя</label>
                <label class="column-name">Фамилия</label>
                <label class="column-name">Отчество</label>
                <label class="column-name">Специальность</label>
                <label class="column-name">Кабинет</label>
            </div>
            <rowTable 
                v-for="doctor, key in doctors" 
                :key="key"
                :doctor="doctor"
                :index="key"
                @delete="deleteDoctor"
                @edit="editPopUp"
                :authUser="authUser"
                :authAdmin="authAdmin"
                ></rowTable>           
        </div>
    </div>
    <vFooter class="footer"></vFooter>
</template>

<script>

import allHeader from '../v-header.vue'
import rowTable from './v-row-table.vue'
import addPopUp from './v-add-pop-up.vue'
import editPopUp from './v-edit-pop-up.vue'
import vFooter from '../home/v-footer.vue'

import axios from 'axios'

export default {
    data() {
        return {
            addPopUpStatus: false,
            editPopUpStatus: false,
            namePage: 'Doctors',
            authUser: false,
            authAdmin: false,
            admin_token: "dea957e17a45886df204fd062f432d3dc7fabc8b",
            doctors: null,
            cabinets: null,
            doctor: {
                id: '',
                index: '',
            }
        }
    },
    name: 'vDoctors',
    components: { 
        allHeader,
        rowTable,
        addPopUp,
        editPopUp,
        vFooter,
    },
    methods: {
        addDoctor(doctor) {           
            axios({
                method: "POST",
                url: "http://127.0.0.1:8000/api/doctors/",
                data: doctor
            }).then(result => console.log(result)).catch(err => console.log(err))
            this.doctors.push(doctor)
            this.getDoctorCabinet()
        },
        getDoctorCabinet() {
            for (let d = 0; d < this.doctors.length; ++d) {
                for(let c = 0; c < this.cabinets.length; ++c) {
                    if (this.doctors[d].cabinet_id === this.cabinets[c].id) {
                        this.doctors[d].cabinet_id = this.cabinets[c].number
                    }
                }
            }
        },
        deleteDoctor(data) {
            console.log(data)
            axios({
                method: "DELETE",
                url: "http://127.0.0.1:8000/api/doctors/"+ data.id + "/"
            }).catch(err => console.log(err))
            this.doctors.splice(data.index, 1)
        },
        editDoctor(doctor) {
            axios({
                method: "PUT",
                url: "http://127.0.0.1:8000/api/doctors/" + this.doctor.id + "/",
                data: {
                    id: this.doctor.id,
                    fname: doctor.fname,
                    sname: doctor.sname,
                    patronymic: doctor.patronymic,
                    speciality: doctor.speciality,
                    cabinet_id: doctor.cabinet_id,
                }
            }).then(result => console.log(result)).catch(err => console.log(err))
            this.doctors[this.doctor.index].fname = doctor.fname
            this.doctors[this.doctor.index].sname = doctor.sname
            this.doctors[this.doctor.index].patronymic = doctor.patronymic
            this.doctors[this.doctor.index].speciality = doctor.speciality
            this.doctors[this.doctor.index].cabinet_id = doctor.cabinet_id
            this.getDoctorCabinet()
        },
        editPopUp(data) {
            this.editPopUpStatus = data.status
            this.doctor.id = data.id
            this.doctor.index = data.index
        },
        loadHome() {
            axios({
                method: "GET",
                headers: {'Authorization': "Token " + sessionStorage.getItem("auth_token")},
                url: "http://127.0.0.1:8000/api/dj-auth/"
            })
            .then((response => {
                console.log(response)
                if (response.status === 200) {
                    this.authUser = true
                }
                console.log(this.authUser)
            }))
            .catch((error) => {
                console.log(error)
            })
            if (sessionStorage.getItem("auth_token") === this.admin_token) {
                this.authAdmin = true
                console.log(this.authAdmin)
            }
        },
        loadCabinets() {
            axios({url: "http://127.0.0.1:8000/api/cabinets/"})
                .then(response => {
                    console.log(response)
                    this.cabinets = response.data
                    console.log(this.cabinets)
                })
                .catch(err => console.log(err))     
        },
        loadDoctors() {
            axios({url: "http://127.0.0.1:8000/api/doctors/"})
                .then(response => {
                    console.log(response)
                    this.doctors = response.data
                    console.log(this.doctors)
                    this.getDoctorCabinet()
                })
                .catch(err => console.log(err))     
        },
        addPopUp() {
            this.addPopUpStatus = true
        },
        cancel(status) {
            this.addPopUpStatus = status
            this.editPopUpStatus = status
        }
    },
    created() {
        this.loadHome()
        this.loadCabinets()
        this.loadDoctors()
    }
}

</script>

<style></style>