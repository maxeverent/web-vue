<template>
    <div class="pop-up-wrapper"></div>
    <div class="pop-up">
        <h1>Add</h1>
        <input v-model="number" type="text" placeholder="Number" class="pop-up-input">
        <input v-model="name" type="text" placeholder="Name" class="pop-up-input">
        <input v-model="dateWorking" type="text" placeholder="Days working" class="pop-up-input">
        <button @click="addCabinet()" class="pop-up-btn">Add</button>
        <button @click="cancel()" class="pop-up-btn">Cancel</button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            status: null,
            number: '',
            name: '',
            dateWorking: '',
            cabinet: '',
        }
    },
    name: 'addPopUp',
    props: {
        popUpStatus: Boolean,
    },
    methods: {
        cancel() {
            this.status = false
            this.$emit('cancel', this.status)
        },
        addCabinet() {
            this.status = false
            this.$emit('add', {
                number: this.number,
                name: this.name,
                date_working: this.dateWorking
            })
            this.cancel()
        },
    }
}

</script>

<style src="@/styles/cabinets/pop-up.scss" lang="scss" scoped></style>