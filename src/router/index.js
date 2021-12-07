import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const Home = () => import('../views/home.vue');
const Login = () => import('../views/Login.vue');

const routes = [{
    path: '/',
    name: '/',
    component: Login
},{
    path: '/home',
    name: 'home',
    component: Home
},{
    path: '/login',
    name: 'login',
    component: Login
}];
export default createRouter({
    history: createWebHashHistory(),
    routes
});