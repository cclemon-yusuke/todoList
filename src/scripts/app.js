import Vue from 'vue';
import MyTemplate from './componets/Example.vue';

new Vue({
    el: '#app',
    components: { MyTemplate },
    template: '<my-template>'
});

let taskList = [];

const vm = new Vue({
   el: '#list',
   data: {
       list: taskList
   }
});

taskList.push({
    name: 'hoge',
    done: false,
});