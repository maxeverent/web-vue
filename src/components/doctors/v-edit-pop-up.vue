<template>
    <div class="pop-up-wrapper"></div>
    <div class="pop-up">
        <h1>Edit</h1>
        <input v-model="doctor.fname" type="text" placeholder="First name" class="pop-up-input">
        <input v-model="doctor.sname" type="text" placeholder="Second name" class="pop-up-input">
        <input v-model="doctor.patronymic" type="text" placeholder="Patronymic" class="pop-up-input">
        <select v-model="selectedSpeciality" class="pop-up-input">
            <option v-for="spec, key in speciality" :key="key">{{spec.name}}</option>
        </select>
        <select v-model="selectedCabinet" class="pop-up-input">
            <option v-for="cabinet, key in cabinets" :key="key">{{cabinet.number}}</option>
        </select>
        <button @click="editDoctor()" class="pop-up-btn">Edit</button>
        <button @click="cancel()" class="pop-up-btn">Cancel</button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            status: null,
            doctor: {
                fname: '',
                sname: '',
                patronymic: '',
                speciality: '',
                cabinet_id: '',
            },
            selectedCabinet: '',
            selectedSpeciality: '',
        }
    },
    name: 'addPopUp',
    props: {
        cabinets: Object,
        speciality: Object,
    },
    methods: {
        cancel() {
            this.status = false
            this.$emit('cancel', this.status)
        },
        editDoctor() {
            this.doctor.speciality = this.selectedSpeciality,
            this.doctor.cabinet_id = this.selectedCabinet,
            this.$emit('edit', this.doctor)
            this.cancel()
        },
    }
}

</script>

<style src="@/styles/doctors/pop-up.scss" lang="scss" scoped></style>