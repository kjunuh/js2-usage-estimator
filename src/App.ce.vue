<script setup lang="ts">
import {ref, reactive, computed, onMounted, watch} from 'vue'
import Calculator from './components/calc.vue'

const count = ref(1)

var explain = ref(false)
onMounted(() => {
  explain.value = (localStorage.getItem("explain") === null) ? false : true
})

interface allSUs {}
var allSUs: Array<number> = reactive([])
const SUTotal = computed(() => {
  let sum = 0
  allSUs.forEach(a => sum += a)
  return sum
})

// var cpuTotal = (() => {
//   let sum = 0
//   let values = allVals.filter((elem) => elem.prefix == 'm3')
//   values.forEach((val) => sum += val.multiplier*val.vcpus*val.hrs*val.days*val.weeks*val.users)
//   return sum
// })
// // const gpuTotal = computed (() => {
// //   return allVals.filter((elem) => elem.prefix == 'g3')
// // })
// // const lmTotal = computed (() => {
// //   return allVals.filter((elem) => elem.prefix == 'r3')
// // })


  
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
  
const allVals = ref<calcValsArray>([])

allVals.value = JSON.parse(localStorage.getItem("storedVals") || "[]")
if (allVals.value.length != 0) {
  allVals.value = [defaults];
}

// function getIndivTotal(prefix: string) {
//   allVals.filter((elem) => elem.prefix == prefix)
//   return 2
// }

// function updateTotals () {
//   cpuTotal = getIndivTotal('m3')
//   getIndivTotal('g3')
//   getIndivTotal('r3')
// }

// watch(allVals, (newVal) => {
//   getIndivTotal('m3')
// })

watch(explain, (newVal) => {
  (newVal) ? localStorage.setItem("explain", "true") : localStorage.removeItem("explain")
})

function modrow (type: string) {
  if(type == 'dec' && allVals.value.length > 1) {
    // test.pop()
    allVals.value.pop()
    allSUs.pop()
  }
  if(type == 'inc' && allVals.value.length < 100) {
    // test.push(1)  
    allVals.value.push(defaults)
  }
  if(type=='rst') {
    while (allVals.value.length > 1) {
      modrow('dec')
    }
  }
  localStorage.setItem('count', JSON.stringify(count.value))
  localStorage.setItem('storedVals', JSON.stringify(allVals))
}

function storeLocal (i: number, val: number) {
  localStorage.setItem('storedVals', JSON.stringify(allVals))
}

// var test = reactive([5])

const styles = {
  ["options-bar"]: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
    listStyle: "none",
  },
  ["option"]: {
    padding: "5px",
  },
  ["right"]: {
    alignSelf: "right",
    marginLeft: "760px"
  }
}

</script>
<template>
  <!-- instance size buttons -->
  <ol :style="styles['options-bar']">
    <li :style="styles['option']">
      <button @click="modrow('dec')">- Remove Row -</button>
    </li>
    <li :style="styles['option']">  
      <button @click="modrow('inc')">+ Add Row +</button>
    </li>
    <li :style="styles['option']">  
      <button @click="modrow('rst')">Reset Rows</button>
    </li>
    <li :style="styles['option']">
      <input type="checkbox" id="checkbox" v-model="explain"/> 
      <label for="checkbox">show explanation</label>
    </li>
    
    <li :style="styles['option']">  
      <div><b>All Instance Total Credits: {{SUTotal.toLocaleString()}}</b></div>
    </li>
  </ol>
    <li v-for="i in allVals.length">
      <Calculator
      v-bind="allVals[i-1]"
      @emitSUs="(val) => {allSUs[i-1] = val}"
      @storeVals="(val) => {allVals[i-1] = val; storeLocal(i-1, val);}"
      :doExplain="explain"
      />
    </li>
      <div :style="styles['right']">
        <b>All Instance Total Credits: {{SUTotal.toLocaleString()}}</b>
      </div>
  <!-- <li v-for="i in test.length"></li> -->
  <!-- {{test}} -->
</template>


