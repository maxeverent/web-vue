<template>
    <div class="reception-row">
        <label class="item">{{reception.fname}}</label>
        <label class="item">{{reception.sname}}</label>
        <label class="item">{{reception.patronymic}}</label>
        <label class="item">{{reception.date}}</label>
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

<style src="@/styles/allrceptions/reception.scss" lang="scss" scoped></style>