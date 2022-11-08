<template>
    <addPopUp v-if="addPopUpStatus" class="pop-up" :popUpStatus="addPopUpStatus" @add="addCabinet" @cancel="cancel"></addPopUp>
    <editPopUp v-if="cabinet.editPopUpStatus" class="pop-up" :cabinet="cabinet" @edit="editCabinet" @cancel="cancel"></editPopUp>
    <div v-if="addPopUpStatus || cabinet.editPopUpStatus" class="pop-up-wrapper"></div>
    <allHeader :namePage="namePage" :authAdmin="authAdmin" :authUser="authUser"></allHeader>
    <div class="wrapper">
        <div class="table">
            <label class="table-title">Cabinets</label>
            <button @click="addPopUp()" class="add-btn">Add</button>
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
    <vFooter class="footer"></vFooter>
</template>

<script>

import allHeader from '../v-header.vue'
import rowTable from '../cabintes/v-row-table.vue'
import addPopUp from './v-pop-up.vue'
import editPopUp from './v-edit-pop-up.vue'
import vFooter from '../home/v-footer.vue'

import axios from 'axios'

export default {
    data() {
        return {
            admin_token: 'dea957e17a45886df204fd062f432d3dc7fabc8b',
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
        allHeader,
        rowTable,
        addPopUp,
        editPopUp,
        vFooter,
    },
    methods: {
        loadPage() {
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
        deleteCabinet(data) {
            axios({
                method: "DELETE",
                url: "http://127.0.0.1:8000/api/cabinets/"+ data.id + "/"
            }).catch(err => console.log(err))
            this.cabinets.splice(data.index, 1)
        },
        addCabinet(data) {
            axios({
                method: "POST",
                url: "http://127.0.0.1:8000/api/cabinets/",
                data: {
                    number: data.number,
                    name: data.name,
                    days_working: data.days_working
                }
            }).then(result => console.log(result)).catch(err => console.log(err))
            this.cabinets.push(data)
        },
        editCabinet(data) {
            axios({
                method: "PUT",
                url: "http://127.0.0.1:8000/api/cabinets/" + data.id + "/",
                data: {
                    number: data.number,
                    name: data.name,
                    days_working: data.days_working
                }
            }).then(result => console.log(result)).catch(err => console.log(err))
            this.cabinets[this.cabinet.index].number = data.number,
            this.cabinets[this.cabinet.index].name = data.name,
            this.cabinets[this.cabinet.index].days_working = data.days_working
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

<style>
    .footer {
        position: relative;
    }

    .wrapper {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        margin-bottom: 100px;
    }

    .pop-up-wrapper {
        width: 100%;
        height: 125%;
        z-index: 1;
        position: absolute;
        background: black;
        opacity: 0.5
    }

    .pop-up {
        bottom: 100px;
        position: absolute;
        z-index: 2;
        top: 20%;
        left: 30%;
    }

    .table {
        margin-top: 60px;
        padding: 30px;
        width: 100%;
        position: relative;
        border-radius: 20px;
        border: 2px solid #dde4ea;
        border-color: #18a3eb;
    }

    .table-title {
        position: absolute;
        top: -50px;
        left: 40%;
        right: 40%;
        background: #fff;
        padding: 20px;
        text-align: center;
        font-size: 30px;
    }

    .add-btn {
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

    .column {
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-around;
        font-size: 25px;
        text-align: left;
    }

    .column-name {
        width: 200px;
        text-align: left;
    }

</style>