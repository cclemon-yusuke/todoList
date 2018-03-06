<template>
    <div>
        <mdc-toolbar>
            <mdc-toolbar-row>
                <mdc-toolbar-section align-start>
                    <mdc-toolbar-title>Todoリスト</mdc-toolbar-title>
                </mdc-toolbar-section>
                <mdc-toolbar-section align-end>
                </mdc-toolbar-section>
            </mdc-toolbar-row>
        </mdc-toolbar>
        <main>
            <mdc-layout-grid>
                <mdc-layout-cell desktop=12 tablet=12 phone=12>
                    <mdc-list>
                        <mdc-list-item>
                            <mdc-textfield v-model="newItem" label="Todoを追加" trailing-icon="check"
                                           @icon-action="addTodo" fullwidth/>
                        </mdc-list-item>
                    </mdc-list>
                    <mdc-list bordered v-for="todos in todo">
                        <mdc-list-item>
                            <mdc-checkbox type="checkbox" v-model='todos.state'
                                          v-on:click="taskTodo(todos.id)"></mdc-checkbox>
                            {{todos.id}},{{todos.title}},{{todos.time}}
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
    import MdcCheckbox from "vue-mdc-adapter/components/checkbox/mdc-checkbox";
    import MdcListItem from "vue-mdc-adapter/components/list/mdc-list-item";

    export default {
        components: {
            MdcListItem,
            MdcCheckbox
        },
        name: 'sample',
        data() {
            return {
                todo: [],
                newItem: '',
                checked: ''

            }
        },
        methods: {
            taskTodo: function (todo_id) {
                for (let i = 0; i < this.todo.length; i++) {
                    if (this.todo[i].id === todo_id) {
                        this.todo[i].state = true;
                    }
                }
            },
            addTodo: function () {

                if (this.newItem === '') return;

                let nextId = '';

                if (this.todo.length === 0) {
                    nextId = 1;
                } else {
                    nextId = this.todo[0].id + 1;
                }

                this.todo.unshift({
                    id: nextId,
                    title: this.newItem,
                    time: moment(new Date).format('YYYY/MM/DD HH:mm:ss'),
                    state: false
                });

                this.newItem = '';
            }
        }
    }
</script>
<style scoped>
    body{
        margin: 0 0 !important;
    }

</style>
