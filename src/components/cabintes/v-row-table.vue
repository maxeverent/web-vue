<template>
    <div class="row">
        <label class="item-table">{{cabinet.number}}</label>
        <label class="item-table">{{cabinet.name}}</label>
        <label class="item-table">{{cabinet.date_working}}</label>
        <button v-if="authAdmin" @click="editCabinet()" class="btn-crud">Edit</button>
        <button v-if="authAdmin" @click="deleteCabinet()" class="btn-crud">Delete</button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            popUpStatus: false
        }
    },
    name: 'v-row-table',
    props: {
        cabinet: Object,
        index: Number,
        authAdmin: Boolean,
        authUser: Boolean
    },
    methods: {
        deleteCabinet() {
            this.$emit('deleteCabinet', {index: this.index, id: this.cabinet.id})
        },
        editCabinet() {
            this.popUpStatus = true
            this.$emit('edit', {status: this.popUpStatus, index: this.index, id: this.cabinet.id})
        }
    }
}

</script>

<style>
    .row {
        display: flex;
        justify-content: space-around;
    }

    .item-table {
        width: 200px;
        padding-top: 5%;
        text-align: left;
    }

    .btn-crud {
        margin-top: 15px;
        margin-bottom: 25px;
        margin: 25px;
        width: 80px;
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
</style>