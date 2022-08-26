<template>
  <h1>ToDo App</h1>
  <form @submit.prevent="addTodo()">
    <label>New ToDo </label>

    <!-- Object which stores todo data and is passed to the event handler -->
    <input v-model="newTodo.title" name="newTodo" autocomplete="off">
    <!-- Done checkbox -->
    <input type="checkbox" v-model="newTodo.completed">

    <button>Add ToDo</button>
  </form>


  <h2>ToDo List</h2>
  <button @click="removeAll()">Remove All</button>
  <ul>

    <li v-for="(todo, index) in todos" :key="index">
      <!-- // Mark done -->

      <div v-if="todo.completed"> √ </div>
      <div v-else> X </div>
      <span :class="{ done: todo.completed }" @click="doneTodo(todo)">
        {{ todo.title }}
      </span>
      <!-- // Delete -->
      <button @click="removeTodo(index)">Remove</button>
    </li>

  </ul>
  <h4 v-if="todos.length === 0">Empty list.</h4>
</template>


<script lang="ts">

import GetData from '@/API';
import { WebTodo } from '@/WebTodos';
import { ref } from 'vue';
import { Todo } from './Data/Todo';
export default {
  name: 'App',
  async setup() {
    const newTodo = ref({} as Todo);

    const defaultData: Todo[] = [{ id: 0, title: 'Learn Vue', completed: false } as Todo];
    // Local storage
    // const todosData = JSON.parse(localStorage.getItem('todos')!) ?? defaultData;
    const localTodos: Todo[] = JSON.parse(localStorage.getItem('todos')!) ?? defaultData;

    // Web example
    let webData = await GetData<WebTodo>().then(data =>
      data.map(item => {
        // return as todo object
        return item as Todo
      })).catch(err => console.error("Couldn't get todos :(\n" + err)) ?? [];


    const todosData: Todo[] = localTodos?.concat(...(webData.length > 0 ? webData : defaultData));

    const todos = ref(todosData);

    function addTodo() {
      if (newTodo.value) {
        // Push todo to array by creating a new object and adding it to the array
        todos.value.push({ ...newTodo.value } as Todo);
      }

      saveData();

      // Clear input
      newTodo.value.title = '';
    }

    function doneTodo(todo: Todo) {
      todo.completed = !todo.completed
      saveData();
    }
    function removeTodo(index: number) {
      todos.value.splice(index, 1);
      saveData();
    }
    function removeAll() {
      confirm('Are you sure you want to remove all todos?');
      todos.value = [];
      localStorage.setItem('todos', JSON.stringify([]));
      saveData();
    }
    function saveData() {
      const storageData = JSON.stringify(todos.value);
      localStorage.setItem('todos', storageData);
    }
    return {
      todos,
      newTodo,
      addTodo,
      doneTodo,
      removeTodo,
      saveData,
      removeAll
    }
  }
}
</script>
