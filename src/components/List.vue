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
      <span :class="{ done: todo.done }" @click="doneTodo(todo)">
        {{ todo.content }}
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
    const newTodo = ref({ content: '', done: false });
    const defaultData = [{
      done: false,
      content: 'Write a blog post'
    }]
    // Local storage
    // const todosData = JSON.parse(localStorage.getItem('todos')!) ?? defaultData;
    const localTodos: Todo[] = JSON.parse(localStorage.getItem('todos')!) ?? defaultData;

    // Web example
    let webData = await GetData<WebTodo>().then(data =>
      data.map(item => {
        return { content: item.title, done: item.completed }
        // Fix type error
      })) as Todo[];

    webData = []

    const todosData: Todo[] =
      localTodos.concat(webData) ?? defaultData;
    const todos = ref(todosData);

    function addTodo() {
      if (newTodo.value) {
        //push todo to array by creating a new object and adding it to the array

        todos.value.push(
          {
            content: newTodo.value.content,
            done: newTodo.value.done
          } as unknown as Todo);
        // todos.value.push({
        //   // Fix type error
        //   // ts(2322) Type '{ content: string; done: boolean; }' is not assignable to type 'Todo'.

        //   // @ts-ignore
        //   content: newTodo.value.content,
        //   done: newTodo.value.done
        // });
      }

      saveData();

      // Clear input
      newTodo.value.content = '';
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
