import { createRouter, createWebHashHistory } from 'vue-router'
import homeAuth from '../components/auth/v-auth.vue'
import vHome from '../components/home/v-home.vue'
import vReg from '../components/auth/v-reg.vue'
import vCabinets from '../components/cabintes/v-cabinets.vue'
import vDoctors from '../components/doctors/v-doctors.vue'
import vReception from '../components/receptions/v-reception.vue'
import vReceptions from '../components/getreceptions/v-receptions'
import vExam from '../components/exam/v-exam'

import vLayout from '../components/v-layout.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: vHome
        },
        {
            path: '/',
            name: 'layout',
            component: vLayout,
            children: [
                {
                    path: 'cabinets/:name',
                    component: vCabinets,
                },
                {
                    path: 'doctors/:name',
                    component: vDoctors,
                    
                },
                {
                    path: 'reception/:name',
                    component: vReception,
                },
                {
                    path: 'getRec/:name',
                    component: vReceptions,
                },
                {
                    path: 'auth/:name',
                    component: homeAuth,
                },
                {
                    path: 'reg/:name',
                    component: vReg,
                },
                {
                    path: 'exam/:name',
                    component: vExam,
                }
            ],
        },
    ]
})

export default router