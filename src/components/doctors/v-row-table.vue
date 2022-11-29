<template>
    <div class="row">
        <label class="item-table">{{doctor.fname}}</label>
        <label class="item-table">{{doctor.sname}}</label>
        <label class="item-table">{{doctor.patronymic}}</label>
        <label class="item-table">{{doctor.speciality}}</label>
        <label class="item-table">{{doctor.cabinet_id}}</label>
        <div class="btns">
            <button v-if="authAdmin" @click="editDoctor()" class="btn-crud">Edit</button>
            <button v-if="authAdmin" @click="deleteDoctor()" class="btn-crud">Delete</button>
        </div>
    </div>
</template>

<script>

export default {
    data() {

    },
    name: 'rowTable',
    props: {
        index: Number,
        doctor: Object,
        authUser: Boolean,
        authAdmin: Boolean,
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