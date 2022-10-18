<script setup lang="ts">
import {ref} from 'vue'
import Calculator from './components/calc.vue'
// import { useRoute } from 'vue-router'
const count = ref(1)

</script>

<template>
  <button @click="count--">Remove Instance Size</button>
  <button @click="count++">Add Instance Size</button>
  <li v-for="i in count">
    <Calculator />
  </li>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-widt: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
