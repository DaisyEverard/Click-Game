<script setup lang="ts">
import type { stateObject } from '../data/types';

const props = defineProps<{ state: stateObject }>()
const state = props.state;

const addColonists = (amountToAdd: number, state: stateObject) => {
    if (state.foodCount < 10) {
        return;
    }
    if (amountToAdd * 10 > state.foodCount) {
        amountToAdd = Math.floor(state.foodCount/10)
    }
    state.colonistCount += amountToAdd;
    state.foodCount -= amountToAdd * 10;
    state.idleColonistCount += amountToAdd;
}

const addToFood = (amountToAdd: number, state: stateObject) => {
    state.foodCount += amountToAdd;
}
</script>

<template>
  <div id="totalsDiv" class="section">
            <div>Food Total: {{ state.foodCount }}</div>
        </div>

        <div id="buttonsDiv" class="section">
            <button  @click="addToFood(1, state)">Grow Food</button><br/>
            <div>
                <button  @click="addColonists(1, state)">Recruit Colonist</button>
                <button  @click="addColonists(10, state)">+10</button>
                <button  @click="addColonists(100, state)">+100</button>
                <span>cost 10 food</span>
            </div>
    </div>
</template>

<style scoped>
</style>
