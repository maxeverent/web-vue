<template>
    <div class="spec">
        <p>{{ speciality }}</p>
        <button @click="deleteSpec()" class="btn">x</button>
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

<style lang="scss" scoped>

    @import '@/styles/variables.scss';

    .spec {
        align-items: center;
        display: flex;
    }

    .btn {
        margin: 5px;
        padding: 0 0 1px 1px;
        background: $btn-color;
        border-radius: 100px;
        border: none;
        width: 20px;
        height: 20px;
        color: white;
        cursor: pointer;
    }

</style>