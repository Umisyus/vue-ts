<template>
  <h1>ToDo App</h1>
  <form @submit.prevent="addTodo()">
    <label>New ToDo </label>

    <!-- Object which stores todo data and is passed to the event handler -->
    <input v-model="newTodo.content" name="newTodo" autocomplete="off">
    <!-- Done checkbox -->
    <input type="checkbox" v-model="newTodo.done">

    <button>Add ToDo</button>
  </form>


  <h2>ToDo List</h2>
  <button @click="removeAll()">Remove All</button>
  <ul>

    <li v-for="(todo, index) in todos" :key="index">
      <!-- // Mark done -->
      <div v-if="todo.done"> √ </div>
      <div v-else> X </div>
      <span :class="{ done: todo.done }" @click="doneTodo(todo)">{{ todo.content }}</span>
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
export default {
  name: 'App',
  async setup() {
    const newTodo = ref({ content: '', done: false });
    const defaultData = [{
      done: false,
      content: 'Write a blog post'
    }]
    // Local storage
    // const todosData = JSON.parse(localStorage.getItem('todos')!) ?? defaultData;
    const localTodos = JSON.parse(localStorage.getItem('todos')!) ?? defaultData;
    let webData = await GetData<WebTodo>().then(data =>
      data.map(item => { return { content: item.title, done: item.completed } }));

    // Web example
    const todosData = webData ?? localTodos ?? defaultData;
    const todos = ref(todosData);
    function addTodo() {
      if (newTodo.value) {
        todos.value.push({
          done: newTodo.value.done,
          content: newTodo.value.content
        });
        newTodo.value.content = '';
      }
      saveData();
    }
    function doneTodo(todo: { done: boolean; }) {
      todo.done = !todo.done
      saveData();
    }
    function removeTodo(index: number) {
      todos.value.splice(index, 1);
      saveData();
    }
    function removeAll() {
      confirm('Are you sure you want to remove all todos?');

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
