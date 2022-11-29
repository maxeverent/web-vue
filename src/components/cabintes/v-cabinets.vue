<template>
    <addPopUp v-if="addPopUpStatus" class="pop-up" :popUpStatus="addPopUpStatus" @add="addCabinet" @cancel="cancel"></addPopUp>
    <editPopUp v-if="cabinet.editPopUpStatus" class="pop-up" :cabinet="cabinet" @edit="editCabinet" @cancel="cancel"></editPopUp>
    <div class="wrapper">
        <div class="table">
            <label class="table-title">Cabinets</label>
            <button v-if="authAdmin" @click="addPopUp()" class="add-btn">Add</button>
            <div class="column">
                <label class="column-name">Номер</label>
                <label class="column-name">Название</label>
                <label class="column-name">Дни работы</label>
            </div>
            <rowTable 
                v-for="cabinet, key in cabinets" 
                :key="key"
                :cabinet="cabinet"
                :index="key"
                @deleteCabinet="deleteCabinet"
                @edit="editPopUp"
                :authAdmin="authAdmin"
                :authUser="authUser"
                ></rowTable>           
        </div>
    </div>
</template>

<script>

import rowTable from '../cabintes/v-row-table.vue'
import addPopUp from './v-pop-up.vue'
import editPopUp from './v-edit-pop-up.vue'

import axios from 'axios'

export default {
    data() {
        return {
            namePage: 'Cabinets',
            authUser: false,
            authAdmin: false,
            cabinets: null,
            addPopUpStatus: false,
            cabinet: {
                id: '',
                index: '',
                editPopUpStatus: false,
            }
        }
    },
    name: 'V-Cabinets',
    components: { 
        rowTable,
        addPopUp,
        editPopUp,
    },
    methods: {
        async loadPage() {
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
                console.log(this.authUser)
            }))
            .catch((error) => {
                console.log(error)
            })
        },
        async loadCabinets() {
            await axios({url: "http://localhost:5000/cabinet/get/", method: "GET"})
                .then(response => {
                    console.log(response)
                    this.cabinets = response.data
                    console.log(this.cabinets)
                })
                .catch(err => console.log(err))     
        },
        async deleteCabinet(data) {
            await axios({
                method: "POST",
                url: "http://localhost:5000/cabinet/delete" + "/" + data.id
            }).catch(err => console.log(err))
            this.cabinets.splice(data.index, 1)
        },
        async addCabinet(data) {
            await axios({
                method: "POST",
                url: "http://localhost:5000/cabinet/create",
                data: {
                    number: data.number,
                    name: data.name,
                    date_working: data.date_working
                }
            }).then(result => console.log(result)).catch(err => console.log(err))
            this.cabinets.push(data)
        },
        async editCabinet(data) {
            await axios({
                method: "POST",
                url: "http://localhost:5000/cabinet/update" + "/" + data.id,
                data: {
                    number: data.number,
                    name: data.name,
                    date_working: data.date_working
                }
            }).then(result => console.log(result)).catch(err => console.log(err))
            this.cabinets[this.cabinet.index].number = data.number,
            this.cabinets[this.cabinet.index].name = data.name,
            this.cabinets[this.cabinet.index].date_working = data.date_working
        },
        editPopUp(data) {
            this.cabinet.editPopUpStatus = data.status
            this.cabinet.id = data.id
            this.cabinet.index = data.index
        },
        addPopUp() {
            this.addPopUpStatus = true
        },
        cancel(status) {
            this.addPopUpStatus = status
            this.cabinet.editPopUpStatus = status
        }
    },
    created() {
        this.loadPage()
        this.loadCabinets()
    }
}

</script>

<style src="@/styles/cabinets/cabinets.scss" lang="scss" scoped></style>