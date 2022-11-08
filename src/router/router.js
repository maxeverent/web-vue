import { createRouter, createWebHashHistory } from 'vue-router'
import homeAuth from '../components/auth/v-auth.vue'
import vHome from '../components/home/v-home.vue'
import vReg from '../components/auth/v-reg.vue'
import vCabinets from '../components/cabintes/v-cabinets.vue'
import vDoctors from '../components/doctors/v-doctors.vue'
import vReception from '../components/receptions/v-reception.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/auth',
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
            path: '/',
            component: vHome
        },
        {
            path: '/reg',
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
        {
            path: '/cabinets',
            component: vCabinets,
        },
        {
            path: '/doctors',
            component: vDoctors,
        },
        {
            path: '/reception',
            component: vReception,
        }
    ]
})

export default router