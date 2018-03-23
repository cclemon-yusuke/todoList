<!--suppress ALL -->
<template>
    <div>
        <commonNav></commonNav>
        <main>
            <mdc-layout-grid>
                <mdc-layout-cell desktop=12 tablet=12 phone=12>
                    <mdc-list>
                        <mdc-list-item>
                            <mdc-textfield v-model="newItem" label="Todoを追加" trailing-icon="check"
                                           @icon-action="addTodo" fullwidth/>
                        </mdc-list-item>
                    </mdc-list>
                    <mdc-list bordered v-for="todo in todos">
                        <mdc-list-item>
                            <mdc-checkbox type="checkbox" v-model='todo.state'
                                          @focus="isChecked(todo.id)"></mdc-checkbox>
                            {{todo.id}},{{todo.title}},{{todo.state}}
                            <i slot="end-detail" class="material-icons" v-on:click="pageTransition">
                                <router-link :to="{ name: 'TodoDetails', params: { id:  todo.id}}">edit</router-link>
                            </i>
                        </mdc-list-item>
                        <mdc-list-divider/>
                    </mdc-list>
                </mdc-layout-cell>
            </mdc-layout-grid>
        </main>
    </div>
</template>

<script>
    import moment from 'moment';
    import MdcCheckbox from 'vue-mdc-adapter/components/checkbox/mdc-checkbox';
    import MdcListItem from 'vue-mdc-adapter/components/list/mdc-list-item';
    import commonNav from '../components/Nav.vue';
    import TodoSample from '../class/Todo.js'
    export default {
        mounted: function () {
            this.loadTodo();
        },
        components: {
            MdcListItem,
            MdcCheckbox,
            commonNav
        },
        name: 'sample',
        data() {
            return {
                todos: [],
                newItem: '',
                checked: ''
            }
        },
        created() {
        },
        methods: {
            /**
             * ローカルストレージからTODOの中身を取ってくる
             */
            loadTodo: function () {
                this.todos = JSON.parse(localStorage.getItem('todos'));
                if (!this.todos) {
                    this.todos = [];
                }
            },
            /**
             *　ローカルストレージにTODOを保存する
             */
            saveTodo: function () {
                localStorage.setItem('todos', JSON.stringify(this.todos));
            },
            /**
             *　チェックボックスのアクション時に値を変更する
             * @param {string} todo_id
             */
            isChecked: function (todo_id) {
                for (let i = 0; i < this.todos.length; i++) {
                    if (this.todos[i].id === todo_id) {
                        this.todos[i].state = this.todos[i].state;
                    }
                }
                this.saveTodo();
            },
            /**
             * TODOが追加された時の処理
             */
            addTodo: function () {
                if (this.newItem === '') return;
                let todoSample = new TodoSample();
                let next_id = todoSample.nextId(this.todos);
                let todoList;
                todoList = todoSample.addTodo(this.todos, next_id, this.newItem);
                this.todos = todoList;
                this.saveTodo();
                this.newItem = '';
            },
            pageTransition: function () {
                this.saveTodo();
            }
        }
    }
</script>
<style scoped>
    body {
        margin: 0 0 !important;
    }
</style>
