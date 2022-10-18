<script setup lang="ts">
import {ref} from 'vue'
const vcpus = ref(1)
const hrs = ref(24)
const days = ref(7)
const weeks = ref(16)
const users = ref(20)


const flavorlist = ref([
  {name: 'm3.tiny', vcpus:1, id:78},
  {name: 'm3.small', vcpus:2, id:18},
  {name: 'm3.quad', vcpus:4, id:21},
  {name: 'm3.medium', vcpus:8, id:15},
  {name: 'm3.large', vcpus:16, id:24},
  {name: 'm3.xl', vcpus:32, id:27},
  {name: 'm3.2xl', vcpus:64, id:30},
  {name: 'm3.3xl', vcpus:128, id:36},
  {name: 'r3.large', vcpus:64, id:66},
  {name: 'r3.xl', vcpus:128, id:72},
  // {name: 'g3.pipeline', vcpus:4, id:87},
  {name: 'g3.small', vcpus:4, id:90},
  {name: 'g3.medium', vcpus:8, id:93},
  {name: 'g3.large', vcpus:16, id:96},
  {name: 'g3.xl', vcpus:32, id:102},
])

const flavor_charge_multipliers = ref([
  {flavor: "m3", multiplier: 1},
  {flavor: "r3", multiplier: 2},
  {flavor: "g3", multiplier: 4},
])

function calcMultiplier() {
  flavorlist
}

</script>

<template>
  <main>
  <!-- <header>
  </header> -->
  <div>Instance Size:</div>
  <select v-model="vcpus" @change="calcMultiplier()">
    <option v-for="flavor in flavorlist" :value="flavor.vcpus"> 
      {{flavor.name}} ({{flavor.vcpus}} vCPUs)
    </option>    
  </select>
  <br>
  <br>
    <div>Number of users</div>
    <input v-model.number="users"/>
  <br>
  <br>
    <div>Hours per day</div>
    <input v-model.number="hrs"/>
  <br>
  <br>
    <div>Days per week</div>
    <input v-model.number="days"/>
  <br>
  <br>
  <div>Total weeks</div>
  <input v-model.number="weeks"/>
  <br>
  <br>
  <!-- @change="calc"> -->
  <div>cost for {{vcpus}} vCPU x {{hrs}} hours/day x {{days}} days/week x {{weeks}} weeks = {{vcpus*hrs*days*weeks}} per user x {{users}} users = {{(vcpus*hrs*days*weeks*users).toLocaleString()}} SUs</div>
</main>
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
