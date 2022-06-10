import { createApp } from 'vue'
import App from '@/App.vue'
import { createStore, Store } from 'vuex'
import type { Todo } from './components/Data/Todo'

export const state = { todos: Array<Todo>() }
export type State = typeof state

// Create a new store instance.
const store = createStore({
    state: {
        todos: Array<Todo>()
    },
    mutations: {

        addTodo(state, todo: Todo): void {
            state.todos.push(todo)
        },
        delTodo(state, todoId: Number): void {

            // find todo
            let todoIndex = state.todos.indexOf(store.getters.getTodo(todoId))
            store.state.todos.splice(todoIndex, 1)
        },
    },
    getters: {

        getAllTodos: (state) => state.todos,
        getDoneTodos: state => state.todos.find((todo: Todo) => todo.completed == true),
        getUnDoneTodos: state => state.todos.find((todo: Todo) => todo.completed == false)
    }
})
createApp(App).use(store).mount('#app')
