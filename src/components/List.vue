<script setup lang="ts">
import { ref } from 'vue'
type Todo = { userId: Number, title: String, id: Number, completed: Boolean }

let items: Array<Todo> = await GetData()

async function GetData(API_URL = 'https://jsonplaceholder.typicode.com/todos/'): Promise<any> {
  let res = await fetch(API_URL)
  if (res.ok == false) {
    return []
  }
  return [...(await res.json())];
}

console.log(items);

</script>

<template>
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
</style>
