<template>
    <div class="pop-up-wrapper"></div>
    <div class="pop-up">
        <h1>Edit</h1>
        <input v-model="number" type="text" placeholder="Number" class="pop-up-input">
        <input v-model="name" type="text" placeholder="Name" class="pop-up-input">
        <input v-model="dateWorking" type="text" placeholder="Days working" class="pop-up-input">
        <button @click="editCabinet()" class="pop-up-btn">Add</button>
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
        }
    },
    name: 'addPopUp',
    props: {
        cabinet: Object,
    },
    methods: {
        cancel() {
            this.status = false
            this.$emit('cancel', this.status)
        },
        editCabinet() {
            this.status = false
            this.$emit('edit', {
                id: this.cabinet.id,
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