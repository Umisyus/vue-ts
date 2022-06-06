import { createApp } from 'vue'
import App from '@/App.vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increment(state: { count: number }, payload) {
            state.count += payload.count
        },
        decrement(state: { count: number }) {
            state.count--
        }
    }
})
createApp(App).use(store).mount('#app')
