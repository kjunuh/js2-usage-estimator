<script setup lang="ts">
import {ref, reactive, computed, onMounted, watch} from 'vue'
import Calculator from './components/calc.vue'
// import { useRoute } from 'vue-router'
const count = ref(1)
var explain = ref(false)

interface allVals {}
var allVals: Array<{}> = reactive([])

interface allSUs {}
var allSUs: Array<number> = reactive([])
const SUTotal = computed(() => {
  let sum = 0
  allSUs.forEach(a => sum += a)
  return sum
})


const defaults = {
  vcpus: 1,
  hrs: 24,
  days: 7,
  weeks: 52,
  users: 20,
  flavorId: 78,
  multiplier: 1,
  prefix: 'm3'
}

onMounted(() => {
  count.value = JSON.parse(localStorage.getItem("count") || JSON.parse('1'))
  explain.value = (localStorage.getItem("explain") === null) ? false : true
  // console.log(localStorage.getItem('storedVals'))
  // if((localStorage.getItem('storedVals') || []).length == 0) {
  //   allVals = [defaults]
  //   console.log(allVals)
  //   console.log("nostorage")
  // } else {
  //   JSON.parse(localStorage.getItem('storedVals') || "").forEach((val: any) => {
  //     allVals.push(val)
  //   })
  //   // console.log(JSON.parse(localStorage.getItem('storedVals') || ""))
  //   console.log("LOADED FROM STORAGE")
  // }
  allVals.push(defaults)
  console.log("allvals", allVals)
})

watch(explain, (newVal) => {
  (newVal) ? localStorage.setItem("explain", "true") : localStorage.removeItem("explain")
})

function modrow (type: string) {
  if(count.value != 1 && type == 'dec') {
    count.value-- 
    allSUs.pop()
    allVals.pop()
  }
  if(count.value != 100 && type == 'inc') {
    count.value++
    allVals.push(defaults)
  }
  if(type=='rst') {
    while (count.value > 1) {
      modrow('dec')
    }
  }
  localStorage.setItem('count', JSON.stringify(count.value))
}

// watch(count, (newVal) => {
// })

</script>
<template>
  {{allVals}}
  <!-- instance size buttons -->
  <ol class="options-bar">
    <li class="option">
      <button @click="modrow('dec')">- Remove Row -</button>
    </li>
    <li class="option">  
      <button @click="modrow('inc')">+ Add Row +</button>
    </li>
    <li class="option">  
      <button @click="modrow('rst')">Reset Rows</button>
    </li>
    <!-- show explanation checkbox -->
    <li class="option">
      <input type="checkbox" id="checkbox" v-model="explain"/> 
      <label for="checkbox">show explanation</label>
    </li>
    
    <li class="option">  
      <div><b>All Instance Total SUs: {{SUTotal.toLocaleString()}}</b></div>
      {{allSUs}}
    </li>
  </ol>
  <!-- <div class="calcs"> -->
    <!-- calculator iterator -->
    <li v-for="i in count">
      <Calculator 
        v-bind="defaults"
        @emitSUs="(val) => {allSUs[i-1] = val}" 
        @storeVals="(val) => {allVals[i-1] = val}" 
        :doExplain="explain" 
      />
        <!-- @storeVals="(val) => {allVals[i-1] = val}" -->
      </li>
  <!-- </div> -->
      <!-- {{allSUs.toLocaleString()}} -->
  <!-- <div class="calcs"> -->
    <div class="right">  
      <b>All Instance Total SUs: {{SUTotal.toLocaleString()}}</b>
    </div>
  <!-- </div> -->
</template>

<style scoped>
.options-bar {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
    list-style: none;
  }
.option{
  padding: 5px;
}
.right {
  align-self: right;
  margin-left: 760px;
}
</style>
