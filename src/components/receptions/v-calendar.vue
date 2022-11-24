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

<style>

    .reception {
        display: flex;
    }

    .calendar {
        width: 60%;
    }

    .nav {
        width: 560px;
        height: 100px;
        margin-left: auto;
        margin-right: auto;
    }

    .nav-items {
        width: 500px;
        margin-left: auto;
        margin-right: auto;
        font-size: 30px;
        margin-top: 20px;
    }

    .nav-item {
        margin: 30px;
    }

    .nav-btn {
        width: 70px;
        height: 70px;
        border-radius: 20px;
        border: none;
        font-family: 'Raleway', sans-serif;
        color: white;
        font-size: 16px;
        font-weight: 600;
        line-height: 1.8;
        background: -moz-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* ff3.6+ */
        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(50,200,250,1)), color-stop(100%, rgba(188,125,228,1))); /* safari4+,chrome */
        background: -webkit-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* safari5.1+,chrome10+ */
        background: -o-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* opera 11.10+ */
        background: -ms-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* ie10+ */
        background: linear-gradient(270deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* w3c */
    }

    .calendar-body {
        margin-top: 30px;
        margin-left: auto;
        margin-right: auto;
        width: 560px;
        height: 500px;
        display: flex;
    }

    .empty-item {
        width: 60px;
        height: 60px;
        margin: 10px;
    }

    .calendar-item {
        display: flex;
        flex-direction: column;
        font-size: 20px;
    }

    .calendar-title {
        width: 60px;
        height: 60px;
        margin: 20px;
        font-size: 25px;
        text-align: center;
    }

    .calendar-btn {
        border-radius: 20px;
        border: none;
        width: 60px;
        height: 60px;
        margin: 10px;
        font-family: 'Raleway', sans-serif;
        color: white;
        font-size: 16px;
        font-weight: 600;
        line-height: 1.8;
        background: -moz-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* ff3.6+ */
        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(50,200,250,1)), color-stop(100%, rgba(188,125,228,1))); /* safari4+,chrome */
        background: -webkit-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* safari5.1+,chrome10+ */
        background: -o-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* opera 11.10+ */
        background: -ms-linear-gradient(180deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* ie10+ */
        background: linear-gradient(270deg, rgba(50,200,250,1) 0%, rgba(88,125,228,1) 100%); /* w3c */
    }
    
</style>