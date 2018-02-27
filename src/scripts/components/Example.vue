<template>
    <div id="todo-list-example">

        <input v-model="message" placeholder="検索" v-on:keyup.enter="searchTodo(message)">

        <br>

        <input type="radio" id="one" value="One" v-model="picked">
        <label for="one">未完了</label>
        <br>
        <input type="radio" id="two" value="Two" v-model="picked">
        <label for="two">完了</label>
        <br>
        <input
                v-model="newTodoText"
                v-on:keyup.enter="addNewTodo"
                placeholder="Todoを入力"
        >
        <ul>
            <div v-if="picked==='One'">
                <li
                        v-for="(todo, index) in todos"
                        v-bind:key="todo.id"
                        v-bind:title="todo.title"
                >
                    <router-link :to="{ name: 'Details', params: { id: todo.id }}" v-bnd:todos="todos">
                        {{todo.title}}
                    </router-link>
                        <button @click="remove(index)">完了️</button>
                </li>
            </div>
            <div v-else-if="picked==='Two'">
                <li
                        v-for="(done) in dones"
                        v-bind:key="done.id"
                        v-bind:title="done.title">
                    ID:{{done.id}},Title:{{done.title}}
                </li>
            </div>
            <div v-else>
                <li
                        v-for="(serResult) in searchResult"
                        v-bind:key="serResult.id"
                        v-bind:title="serResult.title">
                    ID:{{serResult.id}},Title:{{serResult.title}}
                </li>
            </div>
        </ul>
    </div>
</template>

<script>
    export default {
        mounted: function(){
            this.loadTodo();
        },
        name: "sample",
        data() {
            return {
                newTodoText:'',
                picked:'One',
                todos:[
                ],
                nextTodoId:4,
                dones:[

                ],
                message:'',
                searchResult:[
                ]
            }
        },
        methods: {
            loadTodo: function(){
                this.todos = JSON.parse( localStorage.getItem('todos') );
                this.dones = JSON.parse( localStorage.getItem('dones') );
                // if( !this.todos ){
                //     this.todos = [];
                // }
            },
            saveTodo: function(){
                localStorage.setItem('todos', JSON.stringify(this.todos));
                localStorage.setItem('dones', JSON.stringify(this.dones));
            },
            addNewTodo: function () {
                if(this.newTodoText==='') {
                    alert('Todoを入力してください');
                }else {
                    this.todos.push({
                        id: this.nextTodoId++,
                        title: this.newTodoText
                    });
                    this.newTodoText = '';
                        this.saveTodo();
                }
            },
            remove: function (index) {
                this.dones.push({
                    id:this.todos[index].id,
                    title:this.todos[index].title
                });
                this.todos.splice(index, 1);
                this.saveTodo();

            },
            searchTodo:function (word) {
                var newLine = this.todos.filter(function(item){
                    if (item.title === word) return true;
                });

                for(var i=0; i<newLine.length;i++) {
                    this.searchResult.push({
                        id:newLine[i].id,
                        title:newLine[i].title
                    });
                }
                this.picked='';
            }
        }
    }
</script>

<style scoped>

</style>
