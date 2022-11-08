<template>
    <allHeader></allHeader>
    <div class="wrapper">
        <vSpeciality v-if="page === 1" :spec="spec" @next="getSpec"></vSpeciality>
        <vDoctor v-if="page === 2" :speciality="spec" :status="doctor" @next="getDoc" @back="back"></vDoctor>
        <vDate v-if="page === 3"></vDate>
    </div>
    <vFooter></vFooter>
</template>

<script>

import allHeader from '../v-header.vue'
import vFooter from '../home/v-footer.vue'
import vSpeciality from '../receptions/v-speciality.vue'
import vDoctor from '../receptions/v-doctor.vue'
import vDate from '../receptions/v-date.vue'

export default {
    data() {
        return {
            page: 1,
            spec: 'Не выбрано',
            doctor: 'Не выбрано',
            date: '',
            reception: {
                fname: '',
                sname: '',
                patronymic: '',
                date: '',
                auth_token: '',
                doctor_id: '',
            }
        }
    },
    name: 'vReceptions',
    components: {
        allHeader,
        vSpeciality,
        vDoctor,
        vDate,
        vFooter,
    },
    methods: {
        back(data) {
            this.page = data
        },
        getSpec(data) {
            this.page = data.page,
            this.spec = data.spec
        },
        getDoc(data) {
            this.page = data.page,
            this.doctor = data.doc
        }
    }
}

</script>

<style></style>