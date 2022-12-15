<template>
    <div class="body">
        <p>{{ spec }}</p>
        <button @click="deleteSpec()">X</button>
    </div>
</template>

<script>

export default {
    props: {
        id: Number,
        spec: String,
    },
    methods: {
        deleteSpec() {
            this.$emit('deleteSpec', this.id)
        }
    }
}

</script>



<style>

.body {
    display: flex;
}

</style>