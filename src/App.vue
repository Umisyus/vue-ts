<script setup lang="ts">
import { ref } from 'vue';
import List from './components/List.vue';

</script>

<template>
  <Suspense>
    <List />
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
