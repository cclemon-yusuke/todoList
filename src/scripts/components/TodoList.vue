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
                                          @focus="taskTodo(todo.id)"></mdc-checkbox>
                            {{todo.id}},{{todo.title}},{{todo.state}}
                            <i slot="end-detail" class="material-icons" v-on:click="pageTransition">
                                <router-link :to="{ name: 'Details', params: { id:  todo.id}}">edit</router-link>
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
        methods: {
            loadTodo: function () {
                this.todos = JSON.parse(localStorage.getItem('todos'));
                if (!this.todos) {
                    this.todos = [];
                }
            },
            saveTodo: function () {
                localStorage.setItem('todos', JSON.stringify(this.todos));
            },
            taskTodo: function (todo_id) {
                for (let i = 0; i < this.todos.length; i++) {
                    if (this.todos[i].id === todo_id) {
                        this.todos[i].state = true;
                    }
                }
            },
            addTodo: function () {

                if (this.newItem === '') return;

                let nextId = '';

                if (this.todos.length === 0) {
                    nextId = 1;
                } else {
                    nextId = this.todos[0].id + 1;
                }

                this.todos.unshift({
                    id: nextId,
                    title: this.newItem,
                    time: moment(new Date).format('YYYY/MM/DD HH:mm:ss'),
                    state: false,
                    details:''
                });

                this.saveTodo();
                this.newItem = '';
            },
            pageTransition:function () {
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
