import { createRouter, createWebHashHistory } from 'vue-router'
import homeAuth from '../components/auth/v-auth.vue'
import vHome from '../components/home/v-home.vue'
import vReg from '../components/auth/v-reg.vue'
import vCabinets from '../components/cabintes/v-cabinets.vue'
import vDoctors from '../components/doctors/v-doctors.vue'
import vReception from '../components/receptions/v-reception.vue'

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
                    path: 'auth/:name',
                    component: homeAuth,
                    beforeEnter: (to, from, next) => {
                        if (sessionStorage.getItem("auth_token")) {
                            if (sessionStorage.getItem("auth_token") === "dea957e17a45886df204fd062f432d3dc7fabc8b") {
                                next()
                            } 
                            else {
                                next({path: '/'})
                            }
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: 'reg/:name',
                    component: vReg,
                    beforeEnter: (to, from, next) => {
                        if (sessionStorage.getItem("auth_token")) {
                            if (sessionStorage.getItem("auth_token") === "dea957e17a45886df204fd062f432d3dc7fabc8b") {
                                next()
                            } 
                            else {
                                next({path: '/'})
                            }
                        }
                        else {
                            next()
                        }
                    }
                },
            ],
        },
    ]
})

export default router