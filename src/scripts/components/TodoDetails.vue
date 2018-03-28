<template>
    <div>
        <commonNav></commonNav>
        <mdc-layout-grid>
            <mdc-layout-cell desktop=2>
            </mdc-layout-cell>
            <mdc-layout-cell desktop=8 tablet=12 phone=12>
                <mdc-card>
                    <mdc-card-header
                        title="詳細ページ">
                    </mdc-card-header>
                    <mdc-checkbox type="checkbox" v-model='todo.state'
                                  @focus="onChecked(todo.id)"></mdc-checkbox>
                    <mdc-card-text>
                        <mdc-textfield v-model="todo.title" v-bind:disabled="edit" label="タイトル"></mdc-textfield>
                        <mdc-textfield v-model="todo.details" v-bind:disabled="edit" label="詳細"></mdc-textfield>
                    </mdc-card-text>
                    <mdc-card-actions>
                        <mdc-card-action-buttons>
                            <mdc-card-action-button v-on:click="editTodo">編集</mdc-card-action-button>
                        </mdc-card-action-buttons>
                        <mdc-card-action-buttons v-if="editcomplete">
                            <mdc-card-action-button v-on:click="onSave(todo.id)">完了</mdc-card-action-button>
                        </mdc-card-action-buttons>
                        <mdc-card-action-icons>
                            <mdc-card-action-button raised @click="$refs.dialog.show()">削除</mdc-card-action-button>
                        </mdc-card-action-icons>
                    </mdc-card-actions>
                </mdc-card>
            </mdc-layout-cell>
        </mdc-layout-grid>

        <mdc-button>
            <router-link to="/">戻る</router-link>
        </mdc-button>

        <mdc-dialog ref="dialog"
                    title="削除してもいいですか？" accept="はい" cancel="いいえ"
                    @accept="onAccept(todo.id)" @cancel="onDecline"
        ></mdc-dialog>
    </div>
</template>

<script>
    import MdcLayoutCell from "vue-mdc-adapter/components/layout-grid/mdc-layout-cell";
    import MdcDialog from "vue-mdc-adapter/components/dialog/mdc-dialog";
    import commonNav from '../components/Nav.vue';
    import MdcButton from "vue-mdc-adapter/components/button/mdc-button";
    import TodoService from '../class/Todo.js'

    export default {
        components: {
            MdcButton,
            MdcLayoutCell,
            MdcDialog,
            commonNav
        },
        name: 'todo_details',
        props: ['details'],
        data() {
            return {
                todo: '',
                todos: [],
                edit: 'disabled',
                editcomplete: false
            }
        },
        created() {
            if (isNaN(Number(this.$router.currentRoute.params.id))) {
                this.$router.push('/');
            } else {
                let todo_id = Number(this.$router.currentRoute.params.id);
                this.todoId = todo_id;
                let temporaryTodo = JSON.parse(localStorage.getItem('todos'));
                this.todos = JSON.parse(localStorage.getItem('todos'));
                for (let i = 0; i < temporaryTodo.length; i++) {
                    if (todo_id === temporaryTodo[i].id) {
                        this.todo = temporaryTodo[i];
                    }
                }
            }
        },
        methods: {
            saveTodo: function () {
                localStorage.setItem('todos', JSON.stringify(this.todos));
            },
            /**
             *
             */
            editTodo: function () {
                this.edit = false;
                this.editcomplete = true;
            },
            /**
             * 完了ボタンが押された時にローカルストレージに保存する
             * @param todoid
             */
            onSave: function (todo_id) {
                let todosId = todo_id;
                let TodoService = new TodoService();
                let todoList;
                todoList = TodoService.onSave(this.todos, todosId, this.todo);
                this.todos = todoList;
                this.saveTodo();
            },
            /**
             * 押されたidに応じて削除する
             * @param id
             */
            onDelete: function (todo_id) {
                let TodoService = new TodoService();
                let todoDelete;
                todoDelete = TodoService.onDelete(this.todos, todo_id);
                this.todos = todoDelete;
                this.saveTodo();
            },
            onAccept() {
                if (this.$listeners['validate']) {
                    this.$emit('validate', {
                        accept: (notify = true) => this.foundation.accept(notify)
                    });
                }
                else {
                    this.foundation.accept(true)
                }
            },
            show() {
                this.foundation.open()
            },
            close() {
                this.foundation.close()
            },
            onAccept(detailsId) {
                this.onDelete(detailsId);
                this.$router.push('/');
            },
            onDecline() {
                console.log('declined');
            },
            onChecked: function (todo_id) {
                // for (let i = 0; i < this.todos.length; i++) {
                //     if (this.todos[i].id === todo_id) {
                //         this.todos[i].state = this.todos[i].state === false;
                //     }
                // }
                this.saveTodo();
            }
        }
    }
</script>

<style scoped>
</style>
