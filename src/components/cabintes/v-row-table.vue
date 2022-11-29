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

<style src="@/styles/cabinets/row-table.scss" lang="scss" scoped></style>