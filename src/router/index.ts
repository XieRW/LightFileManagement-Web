import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const routes = [{
    path: '/',
    name: '/',
    component: () => import(/* webpackChunkName: "FlightPatrolIndependentView" */ '@/views/Login.vue'),
},{
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "FlightPatrolIndependentView" */ '@/views/home.vue'),
},{
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "FlightPatrolIndependentView" */ '@/views/Login.vue'),
},{
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "FlightPatrolIndependentView" */ '@/views/signup.vue'),
}];
export default createRouter({
    history: createWebHashHistory(),
    routes
});