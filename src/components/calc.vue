<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const props = defineProps<{
  doExplain: boolean
  calcid:number

  init_vcpus:number
  init_hrs:number
  init_days:number
  init_weeks:number
  init_users:number
  init_flavorId:number
  init_multiplier:number
  init_prefix: string
}>()
const emit = defineEmits(['emitSUs'])

const vcpus = ref(props.init_vcpus)
const hrs = ref(props.init_hrs)
const days = ref(props.init_days)
const weeks = ref(props.init_weeks)
const users = ref(props.init_users)
const flavorId = ref(props.init_flavorId)
const multiplier = ref(props.init_multiplier)
const prefix = ref(props.init_prefix)

const calcTotalSUs = computed(() => {
  let total = multiplier.value*vcpus.value*hrs.value*days.value*weeks.value*users.value
  emit('emitSUs', total)
  return total
})

const calcUserSUs = computed(() => {
  
  return multiplier.value*vcpus.value*hrs.value*days.value*weeks.value
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
interface flavor_charge_multipliers {
  
}
const flavor_charge_multipliers: {[index: string]: number} = reactive({
  "m3": 1,
  "r3": 2,
  "g3": 4,
})

function calcMultiplier() {
  prefix.value = flavorlist.filter((elem) => elem.id == flavorId.value)[0].name.split(".")[0]
  multiplier.value = flavor_charge_multipliers[prefix.value]
  vcpus.value =  flavorlist.filter((elem) => elem.id == flavorId.value)[0].vcpus
}

</script>

<template>
    <main>
    <ul class="calc-list">
        <li class="calc-item">
            <div>Instance Size:</div>
            <select v-model="flavorId" @change="calcMultiplier()"> 
              <!-- // @change="calcMultiplier()"> -->
                <option v-for="flavor in flavorlist" :value="flavor.id"> 
                    {{flavor.name}} ({{flavor.vcpus}} vCPUs)
                </option>    
            </select>
        </li>
        <li class="calc-item">
            <div style="display:flex, flex-direction:">Number of users</div>
            <input v-model.number="users"/>
        </li>
        <li class="calc-item">
            <div>Hours per day</div>
            <input v-model.number="hrs"/>
        </li>
        <li class="calc-item">
            <div>Days per week</div>
            <input v-model.number="days"/>
        </li>
        <li class="calc-item">
            <div>Total weeks</div>
            <input v-model.number="weeks"/>
        </li>
        <li class="calc-item">
            <div>SUs per user</div>
            <div>{{calcUserSUs.toLocaleString()}}</div>
        </li>
        <li class="calc-item">
            <div>Total SUs</div> 
            <div>{{calcTotalSUs.toLocaleString()}} </div>
        </li>
    </ul>
    <!-- @change="calc"> -->
    <div v-if="doExplain" > cost for {{vcpus}} vCPU x {{multiplier}} flavor multiplier ({{prefix}}) x {{hrs}} hours/day x {{days}} days/week x {{weeks}} weeks = {{multiplier*vcpus*hrs*days*weeks}} per user x {{users}} users = {{calcTotalSUs.toLocaleString()}} SUs</div>
    <br>
</main>
</template>

<style scoped>

.calc-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
    list-style: none;
}
.calc-item{
    padding: 5px;
}

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
