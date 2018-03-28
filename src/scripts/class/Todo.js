import moment from "moment";

class TodoService {
    constructor() {
        // this.id = this.nextId();
        this.state = false;
        this.moment  =moment(new Date).format('YYYY/MM/DD HH:mm:ss');
    }

    nextId(todos){

        let nextId;

        if (todos.length === 0) {
            nextId = 1;
            localStorage.setItem('todo_id', '1');
        } else {
            let todoNextId = localStorage.getItem('todo_id');
            nextId = Number(todoNextId) + 1;
            localStorage.setItem('todo_id', String(nextId));
        }

        return nextId;
    }

    isChecked(){

    }

    addTodo(todos,nextId,newItem){

        todos.unshift({
            id: nextId,
            title: newItem,
            time: moment(new Date).format('YYYY/MM/DD HH:mm:ss'),
            state: false,
            details: ''
        });

        return todos;
    }

    onSave(todos,todosId,todo){

        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === todosId) {
                todos[i].title = todo.title;
                todos[i].details = todo.details;
            }
        }

        return todos;
    }

    onDelete(todos,todo_id){

        let id_count;

        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === todo_id) {
                id_count = i;
            }
        }
        todos.splice(id_count, 1);

        return todos;
    }
}

export default TodoService;
