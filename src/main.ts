import { createApp } from 'vue'
import App from '@/App.vue'
import { createStore, Store } from 'vuex'
import { Todo } from './components/Data/Todo'

export const state = { todos: Array<Todo>() }
export type State = typeof state

// Create a new store instance.
const store = createStore({
    state: state,
    mutations: {
        // increment(state: { count: number }, payload) {
        //     state.count += payload.count
        // },
        // decrement(state: { count: number }) {
        //     state.count--
        // },
        addTodo(state, todo: Todo): void {
            store.state.todos.push(todo)
        },
        delTodo(state, todoId: Number): void {

            // find todo
            let todoIndex = state.todos.indexOf(store.getters.getTodo(todoId))
            store.state.todos.splice(todoIndex, 1)

        }
    }, getters: {
        allTodos: state => state.todos.map((t: Todo) => t),

        getAllTodos(): Array<Todo> {
            return store.state.todos
        },
        getTodo: state => (todoId: Number) => state.todos
            .find((todo: Todo) => todo.id == todoId),
        getDoneTodos: state => state.todos.find((todo: Todo) => todo.completed == true),
        getUnDoneTodos: state => state.todos.find((todo: Todo) => todo.completed == false)
    }
})
createApp(App).use(store).mount('#app')
