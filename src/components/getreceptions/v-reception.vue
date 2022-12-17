<template>
    <tr>
        <td class="item">{{reception.fname}}</td>
        <td class="item">{{reception.sname}}</td>
        <td class="item">{{reception.patronymic}}</td>
        <td class="item">{{reception.date}}</td>
    </tr>
</template>

<script>

export default {
    props: {
        reception: Object,
    }
}

</script>

<style src="@/styles/allrceptions/reception.scss" lang="scss" scoped></style>