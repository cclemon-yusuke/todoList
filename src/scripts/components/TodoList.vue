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
                                          @focus="saveTodo()"></mdc-checkbox>
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
    import TodoService from '../class/Todo.js'

    export default {
        mounted: function () {

        },
        components: {
            MdcListItem,
            MdcCheckbox,
            commonNav
        },
        name: 'todo_list',
        data() {
            return {
                todos: [],
                newItem: '',
                checked: ''
            }
        },
        created() {
            this.loadTodo();
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
             * TODOが追加された時の処理
             */
            addTodo: function () {
                if (this.newItem === '') return;
                let TodoService = new TodoService();
                let next_id = TodoService.nextId(this.todos);
                this.todos = TodoService.addTodo(this.todos, next_id, this.newItem);
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
