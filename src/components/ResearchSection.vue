<script setup lang="ts">
import type { stateObject } from '../data/types';
const props = defineProps<{ state: stateObject }>()
const state = props.state;
</script>

<template>
    <div id="researchDiv" class="section hide">
        <div>research Total: {{ state.researchCount }}</div>
        <br/>
        <div class="hide unlockBox" id="unlockWoodcuttingBox">
            <span class="unlockTitle">Woodcutting</span>
            <span class="unlockCost">Cost: 100 research</span>
            <button id="unlockWoodcuttingButton" @click="() => console.log('this does nothing yet')">Buy</button>
        </div>
    </div>
</template>

<style scoped>
#researchDiv {
    border: 2px solid green;
}
</style>
