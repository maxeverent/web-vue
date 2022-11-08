<template>
    <div class="pop-up">
        <h1>Edit</h1>
        <input v-model="doctor.fname" type="text" placeholder="First name" class="pop-up-input">
        <input v-model="doctor.sname" type="text" placeholder="Second name" class="pop-up-input">
        <input v-model="doctor.patronymic" type="text" placeholder="Patronymic" class="pop-up-input">
        <input v-model="doctor.speciality" type="text" placeholder="Speciality" class="pop-up-input">
        <select v-model="selectedCabinet">
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
        }
    },
    name: 'addPopUp',
    props: {
        cabinets: Object,
    },
    methods: {
        cancel() {
            this.status = false
            this.$emit('cancel', this.status)
        },
        editDoctor() {
            for (let i = 0; i < this.cabinets.length; ++i) {
                if (this.selectedCabinet === this.cabinets[i].number) {
                    this.doctor.cabinet_id = this.cabinets[i].id
                }
            }
            this.$emit('edit', this.doctor)
            this.cancel()
        },
    }
}

</script>

<style>
    .pop-up {
        display: flex;
        flex-direction: column;
        width: 600px;
        height: 500px;
        padding: 50px;
        position: absolute;
        border-radius: 20px;
        border: 2px solid #dde4ea;
        border-color: #18a3eb;
        background-color: white;
    }

    .pop-up-btn {
        margin-top: 25px;
        margin-bottom: 25px;
        margin-left: auto;
        margin-right: auto;
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

    .pop-up-input {
        margin-top: 25px;
        margin-bottom: 25px;
        color: #828282;
        background: #f0f4f8;
        outline: none;
        border: none;
        padding: 10px;
        margin-bottom: 10px;
        font-size: 16px;
        font-family: 'Raleway';
        font-style: italic;
    }

</style>