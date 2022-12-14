<template>
    <tr>
        <td class="item-table">{{cabinet.number}}</td>
        <td class="item-table">{{cabinet.name}}</td>
        <td class="item-table">{{cabinet.date_working}}</td>
        <td><button v-if="authAdmin == 'true'" @click="editCabinet()" class="btn-crud">Edit</button></td>
        <td><button v-if="authAdmin == 'true'" @click="deleteCabinet()" class="btn-crud">Delete</button></td>
    </tr>
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
        authAdmin: String,
        authUser: String,
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