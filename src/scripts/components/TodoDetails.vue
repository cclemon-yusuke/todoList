<template>
    <div>
        <!--<h3>ID：{{todos[0].id}}</h3>-->
        <!--<h3>タイトル：{{todos[0].title}}</h3>-->
        <commonNav></commonNav>
        <mdc-layout-grid>
            <mdc-layout-cell desktop=8 tablet=12 phone=12>
                <mdc-card>
                    <mdc-card-header
                        title="詳細ページ">
                    </mdc-card-header>
                    <mdc-card-text>
                        <mdc-textfield v-model="todo.title"  v-bind:disabled="edit" label="タイトル"></mdc-textfield>
                        <mdc-textfield v-model="todo.details"  v-bind:disabled="edit" label="詳細"></mdc-textfield>
                    </mdc-card-text>
                    <mdc-card-actions>
                        <mdc-card-action-buttons>
                            <mdc-card-action-button v-on:click="editClick">編集</mdc-card-action-button>
                        </mdc-card-action-buttons>
                        <mdc-card-action-buttons v-if="editcomplete">
                            <mdc-card-action-button v-on:click="editedClick(todo.id)">完了</mdc-card-action-button>
                        </mdc-card-action-buttons>
                        <mdc-card-action-icons>
                            <mdc-card-action-button v-on:click="deleteClick(todo.id)"><router-link to="/">削除</router-link></mdc-card-action-button>
                        </mdc-card-action-icons>
                    </mdc-card-actions>
                </mdc-card>
            </mdc-layout-cell>
        </mdc-layout-grid>

        <router-link to="/">戻る</router-link>
    </div>
</template>

<script>
    import MdcLayoutCell from "vue-mdc-adapter/components/layout-grid/mdc-layout-cell";

    import commonNav from '../components/Nav.vue';

    export default {
        components: {
            MdcLayoutCell,
            commonNav
        },
        name: 'detailes_test',
        props: ['details'],
        data() {
            return {
                todo:'',
                todos: [],
                edit: 'disabled',
                editcomplete:false
            }
        },
        created() {
            let todo_id = this.$router.currentRoute.params.id;
            this.todoId = todo_id;

            let　temporaryTodo=JSON.parse( localStorage.getItem('todos') );

            this.todos= JSON.parse( localStorage.getItem('todos') );

            for(let i=0;i<temporaryTodo.length;i++){
                if(todo_id===temporaryTodo[i].id){
                    this.todo = temporaryTodo[i];
                }
            }
        },
        methods: {
            saveTodo: function () {
                localStorage.setItem('todos', JSON.stringify(this.todos));
            },
            editClick: function () {
                this.edit = false;
                this.editcomplete=true;
            },
            editedClick:function (todoid) {

                let todosId=todoid;

                for(let i=0;i<this.todos.length;i++){
                    if(this.todos[i].id===todosId){
                        this.todos[i].title=this.todo.title;
                        this.todos[i].details=this.todo.details;
                    }
                }

                this.saveTodo();
            },
            deleteClick: function (id) {
                let id_count='';
                for(let i=0;i<this.todos.length;i++){
                    if(this.todos[i].id===id){
                        id_count=i;
                    }
                }
                this.todos.splice(id_count,1);

                this.saveTodo();

            }
        }
    }
</script>

<style scoped>

</style>
