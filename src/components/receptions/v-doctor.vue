<template>
    <label>{{statusDoc}}</label>
    <div>
        <button v-for="doc, key in docs" :key="key" @click="saveDoc(doc)">{{doc.fname + ' ' + doc.sname + ' ' + doc.patronymic}}</button>
        <button @click="next()">Далее</button>
        <button @click="back()">Назад</button>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            statusDoc: this.status,
            doctors: null, 
            docs: [],
            doc: null,
            page: 1,
        }
    },
    name: 'vSpeciality',
    props: {
        speciality: String,
        status: String,
    },
    methods: {
        getDocs() {
            for (let i = 0; i < this.doctors.length; ++i) {
                if (this.doctors[i].speciality === this.speciality) {
                    this.docs.push(this.doctors[i])
                }
            }
        },
        getDoctors() {
            axios({url: "http://127.0.0.1:8000/api/doctors/"})
                .then(response => {
                    console.log(response)
                    this.doctors = response.data
                    console.log(this.doctors)
                    this.getDocs()
                    console.log(this.docs)
                })
                .catch(err => console.log(err)) 
        },
        saveDoc(doc) {
            this.doc = doc
            this.statusDoc = this.doc.fname + ' ' + this.doc.sname + ' ' + this.doc.patronymic
            console.log(this.doc)
        },
        next() {
            this.$emit('next', {doc: this.statusDoc, page: 3})
        },
        back() {
            this.$emit('back', this.page)
        }
    },
    created() {
        this.getDoctors()
    }
}

</script>

<style>

</style>