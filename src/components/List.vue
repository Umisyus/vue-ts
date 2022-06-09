<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MutationPayload, Payload, useStore } from 'vuex';
import GetData from "../API"
import { Todo } from './Data/Todo'
// Type of Todos for type inference / Auto completion
const store = useStore()

let items: Array<Todo> = ref(await GetData())
items = getAllTodosInStore() || []

function getAllTodosInStore() { return store.getters.allTodos }


function addTodo(todo: Todo) {
  store.commit('addTodo', { todo: todo })
  // items = store.state

  items.push = getAllTodosInStore()

  console.log(store.state.todos);
  console.log(store.state.todos.length);

}

function alsoAddTodo({ userId, title, id, completed }
  : { userId: String, title: String, id: Number, completed: Boolean }): void {
  store.commit('addTodo', { todo: { userId, title, id, completed } })
}

function delTodo(todoId: Number) {
  store.commit('deleteTodo', { id: todoId })
}

console.log(store.state.todos.length);

</script>

<template>
  <div class="btn-z" style="margin:5%; width: 100%; display: flex;">Increment/Decrement w/ Store

    <form action="addTodo()" method="post">
      <label>Todo Id:</label> <input type="text">
      <label>Todo title:</label> <input type="text">

    </form>

    <button class="btn" @click="addTodo({ id: 0, title: '', userId: 0, completed: false })">Add Todo!</button>

  </div>

  <div class="">List of Todos from Web</div>
  <ul>
    <li v-for="item in items">
      {{ item.id }}
      {{ item.userId }}
      {{ item.title }}
      {{ item.completed }}
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
