<template>
    <div style="width: 1000px; display:flex; justify-content:space-between">
        <label>{{reception.fname}}</label>
        <label>{{reception.sname}}</label>
        <label>{{reception.patronymic}}</label>
        <label>{{reception.doctor_id}}</label>
        <label>{{reception.date}}</label>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    props: {
        reception: Object,
    }
}

</script>