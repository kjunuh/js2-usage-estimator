<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
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

const props = defineProps<{
  doExplain: boolean

  vcpus:number
  hrs:number
  days:number
  weeks:number
  users:number
  flavorId:number
  multiplier:number
  prefix: string

}>()

const emit = defineEmits(['emitSUs', 'storeVals'])

const vals = reactive({
  vcpus : props.vcpus,
  hrs : props.hrs,
  days : props.days,
  weeks : props.weeks,
  users : props.users,
  flavorId : props.flavorId,
  multiplier : props.multiplier,
  prefix : props.prefix,
})

const calcTotalSUs = computed(() => {
  let total = vals.multiplier*vals.vcpus*vals.hrs*vals.days*vals.weeks*vals.users
  emit('emitSUs', total)
  return total
})

watch(vals, (newValue) => {
  emit('storeVals', newValue)
})


const flavorlist = reactive([
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
  {name: 'g3.small', vcpus:4, id:90},
  {name: 'g3.medium', vcpus:8, id:93},
  {name: 'g3.large', vcpus:16, id:96},
  {name: 'g3.xl', vcpus:32, id:102},
])

const flavor_charge_multipliers: {[index: string]: number} = reactive({
  "m3": 1,
  "r3": 2,
  "g3": 4,
})

function calcMultiplier() {
  vals.prefix = flavorlist.filter((elem) => elem.id == vals.flavorId)[0].name.split(".")[0]
  vals.multiplier = flavor_charge_multipliers[vals.prefix]
  vals.vcpus =  flavorlist.filter((elem) => elem.id == vals.flavorId)[0].vcpus
}

const styles = {
  ["calc-list"]: {
    display: "flex",
    // flexFlow: "row wrap",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
    listStyle: "none",
    alignItems: "baseline",
    gap: "5px"
  },
  ["calc-item"]: {
    padding: "5px",
  },
}

</script>

<template>
    <main>
    <ul :style="styles['calc-list']">
        <li :style="styles['calc-item']">
            <div>Instance Size:</div>
            <select v-model="vals.flavorId" @change="calcMultiplier()">
                <option v-for="flavor in flavorlist" :value="flavor.id">
                    {{flavor.name}} ({{flavor.vcpus}} vCPUs)
                </option>
            </select>
        </li>
        <li :style="styles['calc-item']">
            <div>Number of instances</div>
            <input size="5" v-model.number="vals.users"/>
        </li>
        <li :style="styles['calc-item']">
            <div>Active hours per day</div>
            <!-- <input size="10" v-model.number="vals.hrs"/> -->
            <select v-model.number="vals.hrs">
              <option v-for="i in 24" :value="i">
                {{i}}
              </option>
            </select>
        </li>
        <li :style="styles['calc-item']">
            <div>Active days per week</div>
            <!-- <input size="10" v-model.number="vals.days"/> -->
            <select v-model.number="vals.days">
              <option v-for="i in 7" :value="i">
                {{i}}
              </option>
            </select>
        </li>
        <li :style="styles['calc-item']">
            <div>Total weeks</div>
            <input size="3" v-model.number="vals.weeks"/>
        </li>
        <!-- <li :style="styles['calc-item']">
            <div>SUs per instance</div>
            <div>{{(calcTotalSUs/(vals.users)).toLocaleString()}}</div>
        </li> -->
        <li :style="styles['calc-item']">
            <div>SUs</div>
            <div>{{calcTotalSUs.toLocaleString()}} </div>
        </li>
    </ul>
    <div v-if="doExplain" > cost for {{vals.vcpus}} vCPU x {{vals.multiplier}} flavor multiplier ({{vals.prefix}}) x {{vals.hrs}} hours/day x {{vals.days}} days/week x {{vals.weeks}} weeks = {{(calcTotalSUs/(vals.users)).toLocaleString()}} per instance x {{vals.users}} instances = {{calcTotalSUs.toLocaleString()}} SUs</div>
    <br>
</main>
</template>
