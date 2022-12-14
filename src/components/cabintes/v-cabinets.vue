<template>
    <addPopUp v-if="addPopUpStatus" class="pop-up" :popUpStatus="addPopUpStatus" @add="addCabinet" @cancel="cancel"></addPopUp>
    <editPopUp v-if="cabinet.editPopUpStatus" class="pop-up" :cabinet="cabinet" @edit="editCabinet" @cancel="cancel"></editPopUp>
    <div class="wrapper">
        <div class="table">
            <label class="table-title">Кабинеты</label>
            <button v-if="authAdmin == 'true'" @click="addPopUp()" class="add-btn">Add</button>
            <table style="margin-left: auto; margin-right: auto;">
                <tr>
                    <th>Имя</th>
                    <th>Название</th>
                    <th>Дни работы</th>
                    <th v-if="authAdmin == 'true'">Изменить</th>
                    <th v-if="authAdmin == 'true'">Удалить</th>
                </tr>
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
            </table>          
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
            authUser: sessionStorage.getItem("user"),
            authAdmin: sessionStorage.getItem("admin"),
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
        this.loadCabinets()
    }
}

</script>

<style src="@/styles/cabinets/cabinets.scss" lang="scss" scoped></style>