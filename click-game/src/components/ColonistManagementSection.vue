<script setup lang="ts">
import type { stateObject } from '../data/types';

const props = defineProps<{ state: stateObject }>()
const state = props.state;

const addScientist = (amountToAdd: number, state: stateObject) => {
    if (state.idleColonistCount == 0) {
        return;
    }
    if (state.idleColonistCount < amountToAdd) {
        amountToAdd = state.idleColonistCount
    }
    state.idleColonistCount -= amountToAdd;
    state.scientistCount += amountToAdd;
    state.researchGain += amountToAdd;
}

const addGrower = (amountToAdd: number, state: stateObject) => {
    if (state.idleColonistCount == 0) {
        return;
    }
    if (state.idleColonistCount < amountToAdd) {
        amountToAdd = state.idleColonistCount
    }
    state.idleColonistCount -= amountToAdd;
    state.growerCount += amountToAdd;
    state.foodGain += amountToAdd;
}

const removeScientist = (amountToRemove: number, state: stateObject) => {
    if (state.scientistCount < amountToRemove) {
        amountToRemove = state.scientistCount;
    }
    state.idleColonistCount += amountToRemove;
    state.scientistCount -= amountToRemove;
    state.researchGain -= amountToRemove;
}

const removeGrower = (amountToRemove: number, state: stateObject) => {
    if (state.growerCount < amountToRemove) {
        amountToRemove = state.growerCount;
    }
    state.idleColonistCount += amountToRemove;
    state.growerCount -= amountToRemove;
    state.foodGain -= amountToRemove;
}
</script>

<template>


    <div id="colonistManagementDiv" class="section hide">
            <div style="font-weight: bolder;">Colonist Total: {{ state.colonistCount }}</div>
            <div style="font-weight: bolder;">Idle Colonists: {{ state.idleColonistCount }}</div>
            <br/>
            <div>
                <button @click="removeGrower(10, state)">-10</button>
                <button @click="removeGrower(1, state)">-1</button>
                Growers: {{ state.growerCount }}
                <button @click="addGrower(1, state)">+1</button>
                <button @click="addGrower(10, state)">+10</button>
            </div>

            <div>
                <button @click="removeScientist(10, state)">-10</button>
                <button @click="removeScientist(1, state)">-1</button>
                Scientists: {{ state.scientistCount }}
                <button @click="addScientist(1, state)">+1</button>
                <button @click="addScientist(10, state)">+10</button>
            </div>
        </div>
</template>

<style scoped>
#colonistManagementDiv {
    border: 2px solid rgb(255, 255, 255);
}
</style>
