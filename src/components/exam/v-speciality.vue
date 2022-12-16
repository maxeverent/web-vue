<template>
    <div style="dispaly: flex">
        <p>{{ speciality }}</p>
        <button @click="deleteSpec()">X</button>
    </div>
</template>

<script>

export default {
    props: {
        id: Number,
        speciality: String
    },
    methods: {
        deleteSpec() {
            this.$emit('deleteSpec', this.id)
        }
    }
}

</script>