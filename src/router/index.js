import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Parqueaderos from '../views/Parqueaderos.vue'
import Clientes from '../views/Clientes.vue'
import Vehiculos from '../views/Vehiculos.vue'
import Vehiculo from '../views/Vehiculo.vue'
import Servicios from '../views/Servicios.vue'
import Tarifas from '../views/Tarifas.vue'
import Usuarios from '../views/Usuarios.vue'
import Cuenta from '../views/Cuenta.vue'
import Error_404 from '../views/Error_404.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/parqueaderos', name: 'parqueaderos', component: Parqueaderos },
  { path: '/clientes', name: 'clientes', component: Clientes },
  { path: '/vehiculos', name: 'vehiculos', component: Vehiculos },
  { path: '/vehiculo/:id', name: 'vehiculo', component: Vehiculo },
  { path: '/servicios', name: 'servicios', component: Servicios },
  { path: '/tarifas', name: 'tarifas', component: Tarifas },
  { path: '/usuarios', name: 'usuarios', component: Usuarios },
  { path: '/cuenta', name: 'uuenta', component: Cuenta },
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { path: '*', name: 'error', component: Error_404 },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
