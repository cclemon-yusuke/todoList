import Vue from 'vue';

import Router from 'vue-router'

import Example from '../components/Example.vue';
import Details from '../components/Details.vue';


Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'/',
            name:'Example',
            component:Example
        },
        {
            path:'/details/:id',
            name:'Details',
            component:Details
        }
    ]
})
