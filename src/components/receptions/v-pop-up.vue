<template>
    <div class="pop-up-wrapper"></div>
    <div class="pop-up">
        <h1>Подтверждение</h1>
        <label>{{ reception.fname }}</label>
        <label>{{ reception.sname }}</label>
        <label>{{ reception.patronymic }}</label>
        <label>{{ reception.spec }}</label>
        <label>{{ reception.date }}</label>
        <button @click="rec()" class="pop-up-btn">Записаться</button>
        <button @click="cancel()" class="pop-up-btn">Отмена</button>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            popUpStatus: false,
        }
    },
    props: {
        reception: Object,
    },
    methods: {
        async rec() {
            await axios({
                method: "POST",
                url: "http://localhost:5000/reception/create/",
                headers: {'Authorization': "Bearer " + sessionStorage.getItem("auth_token")},
                data: this.reception
            })
            .then(response => {
                console.log(response)
            })
            .catch(err => console.log(err))
            this.$router.push('/getRec/Receptions')
        },
        cancel() {
            this.$emit('cancel', { popUpStatus: this.popUpStatus })
        }
    }
}

</script>

<style src="@/styles/receptions/pop-up.scss" lang="scss" scoped></style>