<script setup lang="ts">
import {ref, reactive, computed} from 'vue'
import Calculator from './components/calc.vue'
// import { useRoute } from 'vue-router'
const count = ref(1)
const explain = ref(false)
interface allSUs {}
const allSUs: Array<number> = reactive([])
const SUTotal = computed(() => {
  let sum = 0
  allSUs.forEach(a => sum += a)
  return sum
})

const defaults = {
  init_vcpus: 1,
  init_hrs: 24,
  init_days: 7,
  init_weeks: 16,
  init_users: 20,
  init_flavorId: 78,
  init_multiplier: 1,
  init_prefix: "m3",
}

console.log(allSUs)

</script>

<template>
  <!-- instance size buttons -->
  <button @click="() => {if(count != 1) {count--; allSUs.pop()}}">Remove Instance Size</button>
  <button @click="() => {if(count != 14) count++}">Add Instance Size</button>

  <!-- show explanation checkbox -->
  <input type="checkbox" id="checkbox" v-model="explain"/> 
  <label for="checkbox">show explanation</label>

  <!-- calculator iterator -->
  <li v-for="i in count">
    <Calculator :calcid="i" @emitSUs="(val) => {allSUs[i-1] = val}" :doExplain="explain" v-bind="defaults"/>
  </li>
  <div>Total: {{SUTotal}} </div>
  <!-- {{(allSUs) => {allSUs[i]}}} -->
  <!-- {{(allSUs, count) => {allSUs+count}}} -->
  {{allSUs}}
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
