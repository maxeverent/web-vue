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
            <label class="table-title">Доктора</label>
            <button v-if="authAdmin == 'true'" @click="addPopUp()" class="add-btn">Add</button>
            <table style="margin-left: auto; margin-right: auto;">
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Отчество</th>
                    <th>Специальность</th>
                    <th>Кабинет</th>
                    <th v-if="authAdmin == 'true'">Изменить</th>
                    <th v-if="authAdmin == 'true'">Удалить</th>
                </tr>
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
            </table>        
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
            authUser: sessionStorage.getItem("user"),
            authAdmin: sessionStorage.getItem("admin"),
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
                method: "POST",
                url: "http://localhost:5000/doctor/delete" + "/" + data.id
            }).catch(err => console.log(err))
            this.doctors.splice(data.index, 1)
        },
        async editDoctor(doctor) {
            await axios({
                method: "POST",
                url: "http://localhost:5000/doctor/update" + "/" + this.doctor.id,
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
    },
    created() {
        this.loadDoctors()
    }
}

</script>

<style src="@/styles/doctors/doctors.scss" lang="scss" scoped></style>