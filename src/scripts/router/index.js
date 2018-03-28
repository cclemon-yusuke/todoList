import Vue from 'vue';

import Router from 'vue-router'

import TodoList from '../components/TodoList.vue';
import TodoDetails from '../components/TodoDetails.vue';

Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'',
            name:'TodoList',
            component:TodoList
        },
        {
            path:'/TodoDetails/:id',
            name:'TodoDetails',
            component:TodoDetails
        }
    ]
})
