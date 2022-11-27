<template>
    <div class="pop-up-wrapper"></div>
    <div class="pop-up">
        <h1>Подтверждение</h1>
        <p>Хотите записаться?</p>
        <label></label>
        <label></label>
        <label></label>
        <label></label>
        <label></label>
        <button @click="rec()">Записаться</button>
        <button @click="cancel()">Отмена</button>
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