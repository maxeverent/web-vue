<template>
    <tr>
        <td class="item">{{exams.speciality}}</td>
        <td class="item">{{exams.date}}</td>
    </tr>
</template>

<script>

export default {
    props: {
        exams: Object,
    }
}

</script>

<style src="@/styles/allrceptions/reception.scss" lang="scss" scoped></style>