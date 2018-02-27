<template>
    <div>
        <h1>詳細ページ</h1>
        <h3>ID：{{todos[0].id}}</h3>
        <h3>タイトル：{{todos[0].title}}</h3>
        <router-link to="/">戻る</router-link>
    </div>
</template>

<script>
    export default {
        name: "detailes_test",
        props: ['details'],
        data(){
            return{
                id:'',
                todos:[]
            }
        },
        created() {
            var id = this.$router.currentRoute.params.id;
            this.id=id;

            this.todos = JSON.parse( localStorage.getItem('todos') );

        }
    }
</script>

<style scoped>

</style>
