<template>
    <tr>
        <td class="item-table">{{doctor.fname}}</td>
        <td class="item-table">{{doctor.sname}}</td>
        <td class="item-table">{{doctor.patronymic}}</td>
        <td class="item-table">{{doctor.speciality}}</td>
        <td class="item-table">{{doctor.cabinet_id}}</td>
        <td v-if="authAdmin == 'true'"><button @click="editDoctor()" class="btn-crud">Edit</button></td>
        <td v-if="authAdmin == 'true'"><button @click="deleteDoctor()" class="btn-crud">Delete</button></td>
    </tr>
</template>

<script>

export default {
    data() {

    },
    name: 'rowTable',
    props: {
        index: Number,
        doctor: Object,
        authUser: String,
        authAdmin: String,
    },
    methods: {
        deleteDoctor() {
            console.log('qwe')
            this.$emit('delete', {index: this.index, id: this.doctor.id})
        },
        editDoctor() {
            this.popUpStatus = true
            this.$emit('edit', {status: this.popUpStatus, index: this.index, id: this.doctor.id})
        }
    }
}

</script>

<style src="@/styles/doctors/row-table.scss" lang="scss" scoped></style>