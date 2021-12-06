import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const Home = import('../views/home.vue')

const routes = [{
    path: '/home',
    name: 'home',
    component: Home
}
];
export default createRouter({
    history: createWebHashHistory(),
    routes
});