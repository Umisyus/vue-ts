<script setup lang="ts">
import { ref } from 'vue';
import TodoList from './components/List.vue';

</script>

<template>
  <Suspense>
    <TodoList />

  </Suspense>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
