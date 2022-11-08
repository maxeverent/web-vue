<template>
    <div>{{data}}</div>
    <button @click="getFreeDate()">test</button>
    <button v-for="time, key in freeTime" :key="key">{{time}}</button>
    <vCalendar @date="getDate" ></vCalendar>
</template>

<script>

import vCalendar from './v-calendar.vue'

import axios from 'axios'

export default {
    data() {
        return {
            data: '',
            time: ['9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10.30', '10:45', '11:00', '11.15', '11:30'],
            receptions: null,
            freeTime: []
        }
    },
    name: 'vDate',
    components: { vCalendar },
    methods: {
        getDate(data) {
            this.data = data[0] + ' ' + data[1]
        },
        getDateReception() {
            axios({url: "http://127.0.0.1:8000/api/receptions/"})
                .then(response => {
                    console.log(response)
                    this.receptions = response.data
                    console.log(this.receptions)
                })
                .catch(err => console.log(err)) 
        },
        getFreeDate() {
            if (this.data != '') {
                //console.log('test')
                this.freeTime = []
                for(let i = 0; i < this.time.length; ++i) {
                    this.freeTime.push(this.time[i])
                }
                console.log(this.receptions.length)
                for (let i = 0; i < this.receptions.length; ++i) {
                    let date = this.receptions[i].date.split(' ')
                    let selectedDate = date[0] + ' ' + date[1] + ' ' + date[2]
                    //console.log(selectedDate)
                    //console.log(this.data + ' ' + '2022')
                    if (this.data + ' ' + '2022' === selectedDate) {
                        for (let j = 0; j < this.time.length; ++j) {
                            if (this.time[j] === date[3]) {
                                this.freeTime.splice(j, 1)
                            }
                        }
                    }
                }
            }
        }
    },
    created() {
        this.getDateReception()
    }
}

</script>

<style></style>