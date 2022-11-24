<template>
    <addPopUp 
        v-if="addPopUpStatus" 
        :cabinets="cabinets" 
        :speciality="speciality" 
        @cancel="cancel" 
        @add="addDoctor" 
        class="pop-up"
        ></addPopUp>
    <editPopUp 
        v-if="editPopUpStatus" 
        :cabinets="cabinets" 
        :speciality="speciality" 
        @cancel="cancel" 
        @edit="editDoctor" 
        class="pop-up"
        ></editPopUp> 
    <div class="wrapper">
        <div class="table">
            <label class="table-title">Doctors</label>
            <button v-if="authAdmin" @click="addPopUp()" class="add-btn">Add</button>
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

import rowTable from './v-row-table.vue'
import addPopUp from './v-add-pop-up.vue'
import editPopUp from './v-edit-pop-up.vue'

import axios from 'axios'

export default {
    data() {
        return {
            addPopUpStatus: false,
            editPopUpStatus: false,
            namePage: 'Doctors',
            authUser: false,
            authAdmin: false,
            doctors: null,
            cabinets: null,
            speciality: null,
            doctor: {
                id: '',
                index: '',
            }
        }
    },
    name: 'vDoctors',
    components: { 
        rowTable,
        addPopUp,
        editPopUp,
    },
    methods: {
        async addDoctor(doctor) {           
            await axios({
                method: "POST",
                url: "http://localhost:5000/doctor/create",
                data: doctor
            }).then(result => console.log(result)).catch(err => console.log(err))
            this.doctors.push(doctor)
        },
        async deleteDoctor(data) {
            console.log(data)
            await axios({
                method: "DELETE",
                url: "http://localhost:5000/doctor/delete"+ data.id + "/"
            }).catch(err => console.log(err))
            this.doctors.splice(data.index, 1)
        },
        async editDoctor(doctor) {
            await axios({
                method: "PUT",
                url: "http://localhost:5000/doctor/udapte" + this.doctor.id + "/",
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
        },
        async loadCabinets() {
            await axios({url: "http://localhost:5000/cabinet/get"})
                .then(response => {
                    console.log(response)
                    this.cabinets = response.data
                    console.log(this.cabinets)
                })
                .catch(err => console.log(err))     
        },
        async loadDoctors() {
            await axios({url: "http://localhost:5000/doctor/get"})
                .then(response => {
                    console.log(response)
                    this.doctors = response.data
                    console.log(this.doctors)
                })
                .catch(err => console.log(err))     
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
        editPopUp(data) {
            this.editPopUpStatus = data.status
            this.doctor.id = data.id
            this.doctor.index = data.index
        },
        addPopUp() {
            this.addPopUpStatus = true
        },
        cancel(status) {
            this.addPopUpStatus = status
            this.editPopUpStatus = status
        },
        async loadHome() {
            await axios({
                method: "GET",
                headers: {'Authorization': "Bearer " + sessionStorage.getItem("auth_token")},
                url: "http://localhost:5000/auth/users/"
            })
            .then((response => {
                console.log(response)
                if (response.status === 200) {
                    this.authUser = true
                    this.authAdmin = false
                    if (response.data.message != 'нет прав') {
                        this.authAdmin = true
                    }
                }
            }))
            .catch((error) => {
                console.log(error)
            })
        },
    },
    created() {
        this.loadHome()
        this.loadCabinets()
        this.loadDoctors()
        this.loadSpeciality()
    }
}

</script>

<style>
    html {
        width:100vw;
        overflow-x:hidden;
    }
</style>