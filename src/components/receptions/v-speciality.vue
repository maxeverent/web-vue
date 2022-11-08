<template>
    <label>{{specStatus}}</label>
    <div >
        <button v-for="spec, key in speciality" @click="getSpec(spec)" :key="key">{{spec}}</button>
        <button @click="next()">Далее</button>
        <button @click="getSpec('Не выбрано')">Отмена</button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            speciality: ['Терапевт', 'Хирург'],
            specStatus: this.spec,
        }
    },
    name: 'vSpeciality',
    props: {
        spec: String,
    },
    methods: {
        getSpec(spec) {
            this.specStatus = spec
            console.log(this.specStatus)
        },
        next() {
            if (this.specStatus !== 'Не выбрано') {
                this.$emit('next', {spec: this.specStatus, page: 2})
            }
        },
    }
}

</script>

<style>

</style>