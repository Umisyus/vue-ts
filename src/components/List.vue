<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ items: Array<Object> }>()

// let items: Array<Object> = []

let api_data = await GetData()
console.log(api_data);

let items = api_data

async function GetData(API_URL = 'https://jsonplaceholder.typicode.com/todos/'): Promise<any> {
  let res = await fetch(API_URL)
  return res.json();
}

</script>

<template>
  <ul>
    <li v-for="item in items">
      {{ item.title }}
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
</style>
