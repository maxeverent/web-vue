<template>
    <div class="calendar">
        <div class="nav">
            <div class="nav-items">
                <button @click="beforePage" class="nav-item nav-btn" >back</button>
                <label class="nav-item">{{calendar[numberPage].name_mounth}}</Label>
                <button @click="nextPage" class="nav-item nav-btn">go</button>
            </div>
        </div>
        <div class="calendar-body">
            <div v-for="weekDay, index in weekDays" :key="index" >
                <label class="calendar-title">{{weekDay.nameDay}}</Label>
                <div v-if="sortDaysWeek(numberPage, weekDay.num, index) == false" class="empty-item">
                    <ui>
                        <label>{{" "}}</label>
                    </ui>
                   </div>
                <div class="calendar-item">
                    <ui v-for="day, index in calendar[numberPage].days" :key="index">
                        <button v-if="weekDay.num === getWeekDay(numberPage, day)" @click="sendDay(day, calendar[numberPage].name_mounth)" class="calendar-btn">{{day}}</button>
                    </ui> 
                </div>                                                  
            </div> 
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            numberPage: new Date().getMonth(),
            nowDay: new Date().getDate(),
            nowMonth: new Date().getMonth(),
            weekDays: [{num: 1 , nameDay: "Mo"}, {num: 2 , nameDay: "Tu"},
                {num: 3 , nameDay: "We"}, {num: 4 , nameDay: "Th"}, {num: 5 , nameDay: "Fr"}, 
                {num: 6 , nameDay: "Sa"}, {num: 0 , nameDay: "Su"}, ],
            calendar: [],
            mounths: ['January', 'February', 'Mart', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        }
    },
    name: 'vCalendar',
    methods: {
        setCalendar() {
            for (let i = 0; i < 12; ++i) {
                let days = new Date(2022, i + 1, 0).getDate()
                this.calendar.push({mounths: i + 1, name_mounth: this.mounths[i], days: days})
            }
        },
        nextPage() {
            if (this.numberPage === 11) {
                this.numberPage = 0
            }
            else {
                this.numberPage += 1
            }       
        },
        beforePage() {
            if (this.numberPage === 0) {
                this.numberPage = 11
            }
            else {
                this.numberPage -= 1
            } 
        },
        getWeekDay(mounth, day) {
            const test = new Date(2022, mounth, day).getDay()
            return test           
        },
        sortDaysWeek(mounth, num, index) {
            let status = null
            for (let i = 1; i < index + 2; ++i) {
                if (num === this.getWeekDay(mounth, i)) {
                    status = true
                    break
                }
                else {
                    status = false
                }
            }
            return status
        },
        backToNowMounth() {
            let nowMounth = new Date().getMonth()
            this.numberPage = nowMounth 
        },
        nowDateClass(day, numberPage) {
            if (day === this.nowDay && numberPage === this.nowMonth) {
                return true
            }
            return false
        },
        sendDay(day, month) {
            this.$emit('date', [day, month])
        }
    },
    created() {
        this.setCalendar()
    }
}

</script>

<style src="@/styles/receptions/calendar.scss" lang="scss" scoped></style>