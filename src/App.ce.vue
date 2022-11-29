<script setup lang="ts">
import {ref, reactive, computed, onMounted, watch} from 'vue'
import Calculator from './components/calc.vue'

const count = ref(1)

const explain = ref(false)
onMounted(() => {
  explain.value = (localStorage.getItem("explain") === null) ? false : true
})

interface allSUs {}
const allSUs: Array<number> = reactive([])
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

const allVals = ref<calcValsArray>([])

allVals.value = JSON.parse(localStorage.getItem("storedVals") || "[]")
if (allVals.value.length == 0) {
  allVals.value = [defaults];
}

function sumVals(vals: calcVals) {
  return vals.multiplier*vals.vcpus*vals.hrs*vals.days*vals.weeks*vals.users
}

const cpuTotal = computed(() => {
  let sum = 0
  allVals.value.filter((elem) => elem.prefix == "m3").forEach(a => sum += sumVals(a))
  return sum
}) 
const gpuTotal = computed(() => {
  let sum = 0
  allVals.value.filter((elem) => elem.prefix == "g3").forEach(a => sum += sumVals(a))
  return sum
}) 
const lmTotal = computed(() => {
  let sum = 0
  allVals.value.filter((elem) => elem.prefix == "r3").forEach(a => sum += sumVals(a))
  return sum
}) 

watch(explain, (newVal) => {
  (newVal) ? localStorage.setItem("explain", "true") : localStorage.removeItem("explain")
})

function modrow (type: string) {
  if(type == 'dec' && allVals.value.length > 1) {
    allVals.value.pop()
    allSUs.pop()
  }
  if(type == 'inc' && allVals.value.length < 100) {
    allVals.value.push(defaults)
  }
  if(type=='rst') {
    while (allVals.value.length > 1) {
      modrow('dec')
    }
  }
  localStorage.setItem('count', JSON.stringify(count.value))
  localStorage.setItem('storedVals', JSON.stringify(allVals.value))
}

function storeLocal (i: number, val: number) {
  localStorage.setItem('storedVals', JSON.stringify(allVals.value))
}


const styles = {
  ["options-bar"]: {
    display: "flex",
    // flexFlow: "row wrap",
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
  <table>
    <th>Options:</th>
    <td>
      <button @click="modrow('dec')">- Remove Row -</button>
    </td>
    <td>  
      <button @click="modrow('inc')">+ Add Row +</button>
    </td>
    <td>  
      <button @click="modrow('rst')">Reset Rows</button>
    </td>
    <td>
      <input type="checkbox" id="checkbox" v-model="explain"/> 
      <label for="checkbox">show explanation</label>
    </td>
  </table>



  <!-- calculator object -->
  <hr>
  <li v-for="i in allVals.length" style="list-style:none;">
    <Calculator
    v-bind="allVals[i-1]"
    @emitSUs="(val) => {allSUs[i-1] = val}"
    @storeVals="(val) => {allVals[i-1] = val; storeLocal(i-1, val);}"
    :doExplain="explain"
    />
    <hr>
  </li>
  <!-- totals table -->
  <table style="border-spacing: 5px;">
    <tr>
      <td style="text-align: right"><b>Instance Type:</b></td>
      <td v-if="cpuTotal"><b>CPU (m3)</b></td>
      <td v-if="gpuTotal"><b>GPU (g3)</b></td>
      <td v-if="lmTotal"><b>Large Memory (r3)</b></td>
      <td><b>Total SUs</b></td>
    </tr>
    <tr>
      <td style="text-align: right">SUs:</td>
      <td v-if="cpuTotal">{{cpuTotal.toLocaleString()}}</td>
      <td v-if="gpuTotal">{{gpuTotal.toLocaleString()}}</td>
      <td v-if="lmTotal">{{lmTotal.toLocaleString()}}</td>
      <td><b>{{SUTotal.toLocaleString()}}</b></td>
    </tr>
  </table>
</template>


