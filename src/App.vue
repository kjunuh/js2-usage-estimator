<script setup lang="ts">
import {ref, reactive, computed, onMounted, watch} from 'vue'
import Calculator from './components/calc.vue'
// import { useRoute } from 'vue-router'
const count = ref(1)
var explain = ref(false)

// interface allVals []

interface allSUs {}
var allSUs: Array<number> = reactive([])
const SUTotal = computed(() => {
  let sum = 0
  allSUs.forEach(a => sum += a)
  return sum
})
  
interface calcVals {
  vcpus: number,
  hrs: number,
  days: number,
  weeks: number,
  users: number,
  flavorId: number,
  multiplier: number,
  prefix: string,
}
  
const defaults: calcVals = {
  vcpus: 1,
  hrs: 24,
  days: 7,
  weeks: 52,
  users: 20,
  flavorId: 78,
  multiplier: 1,
  prefix: 'm3'
}

interface calcValsArray extends Array<calcVals>{}
  
var allVals: calcValsArray = reactive([])

allVals = JSON.parse(localStorage.getItem("storedVals") || "[]")
if (allVals.length == 0) {
  allVals.push(defaults)
}

watch(explain, (newVal) => {
  (newVal) ? localStorage.setItem("explain", "true") : localStorage.removeItem("explain")
})

function modrow (type: string) {
  if(type == 'dec' && allVals.length > 1) {
    console.log(allVals)
    allVals.pop()
    console.log(allVals)
  }
  if(type == 'inc' && allVals.length < 100) {
    console.log(allVals)
    allVals.push(defaults)
    console.log(allVals)
  }
  if(type=='rst') {
    while (allVals.length > 1) {
      modrow('dec')
    }
  }
  localStorage.setItem('count', JSON.stringify(count.value))
  localStorage.setItem('storedVals', JSON.stringify(allVals))
  // console.log(JSON.stringify(allVals))
}

function storeLocal (i: number, val: number) {
  localStorage.setItem('storedVals', JSON.stringify(allVals))
  console.log(JSON.stringify(val), i)
}

function testerfunc () {
  console.log('allVals', allVals)
  console.log('def', defaults)
  console.log('vals', allVals[0])
}

// watch(count, (newVal) => {
// })

</script>
<template>
  <!-- instance size buttons -->
  <ol class="options-bar">
    <li class="option">
      <button @click="testerfunc">tester button</button>
    </li>
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
    <li v-for="value, i in allVals">
      <!-- :vals="allVals[i]" -->
      {{value}}
      {{i}}
      <Calculator 
        v-bind="value" 
        @emitSUs="(val) => {allSUs[i] = val}" 
        @storeVals="(val) => {allVals[i] = val; storeLocal(i, val)}" 
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
