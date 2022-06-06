<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MutationPayload, Payload, useStore } from 'vuex';
import GetData from "../API"
// Type of Todos for type inference / Auto completion
type Todo = { userId: Number, title: String, id: Number, completed: Boolean }

let items: Array<Todo> = await GetData()

const store = useStore()

function increment() {
  // Payload (2nd argument) is the data we want to enter the store
  store.commit('increment', { count: +1 })
  console.log(store.state.count);
}

function decrement() {
  store.commit('decrement', { count: -1 })
  console.log(store.state.count);
}

console.log(store.state.count);

</script>

<template>
  <div class="btn-z" style="margin:5%; width: 100%; display: flex;">Increment/Decrement w/ Store

    <button class="btn" @click="increment">Count UP!</button>
    <button class="btn" @click="decrement">Count DOWN!</button>
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
