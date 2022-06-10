<template>
  <div class="btn-z" style="margin:5%; width: 100%; display: flex;">Increment/Decrement w/ Store


    <label>Todo title: </label> <input type="text" v-model="todoTitle">
    <label>Todo title:</label> <input type="checkbox" value="true" v-model="todoCompleted">

    <button class="btn" @keypress.enter="addTodo">Add
      Todo!</button>

  </div>

  <div class="">List of Todos from Web</div>
  <ul>
    todos
    <li v-for="item in todos">
      {{ item.todo.title }}
      {{ item.todo.completed ? '√' : 'X'}}
    </li>
  </ul>
</template>

<style scoped>
a {
  color: #42b983;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

.btn-z {
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn {
  max-width: 5%;
  flex-wrap: wrap;
}
</style>



<script lang="ts">
import { computed, onMounted, ref } from 'vue'
import { MutationPayload, Payload, useStore } from 'vuex';
import GetData from "../API"
import { Todo } from './Data/Todo'


export default {

  setup() {
    // Type of Todos for type inference / Auto completion
    const store = useStore()

    // Todo container
    let todos = computed(() => store.state.todos)

    let todoTitle = ref("");
    let todoCompleted = ref(false);

    // Array of todos in page

    function getAllTodosInStore() { return store.state.todos }

    function addTodo() {
      // if (todo == null || todo == undefined) {
      //   throw new Error("Todo was NULL or UNDEFINED")
      // }

      // Default values for user id
      let thisTodo = { title: todoTitle, completed: todoCompleted }

      store.commit('addTodo', { todo: thisTodo })

      console.log(store.state.todos);
      console.log("Total todos: " + store.state.todos.length);
    }

    function alsoAddTodo({ userId, title, id, completed }
      : { userId: String, title: String, id: Number, completed: Boolean }): void {
      store.commit('addTodo', { todo: { userId, title, id, completed } })
    }

    function delTodo(todoId: Number) {
      store.commit('deleteTodo', { id: todoId })
    }

    console.log(getAllTodosInStore());

    return { todos, todoTitle, todoCompleted, addTodo }
  }
}
</script>
