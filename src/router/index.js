import {createRouter } from 'vue-router';

var routers = [{
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "FlightPatrolIndependentView" */ '@/pages/Login.vue'),
    // children: [{
    //     path: '',
    //     component: r => require.ensure([], () => r(require('../pages/home')), 'home')
    // }, {
    //     path: '/item',
    //     component: r => require.ensure([], () => r(require('../page/item')), 'item')
    // }, {
    //     path: '/score',
    //     component: r => require.ensure([], () => r(require('../page/score')), 'score')
    // }]
}]


export default createRouter({
    routers
})