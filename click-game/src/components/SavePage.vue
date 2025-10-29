<script setup lang="ts">
import type { stateObject } from '../data/types';
const props = defineProps<{ state: stateObject }>();
const state = props.state;

const exportTextInput = document.getElementById("exportTextInput") as HTMLInputElement;
const importTextInput = document.getElementById("importTextInput") as HTMLInputElement;
// const validateObject = (state: JSON) => {
//     // returns boolean. True = good, False = bad
//     return true
// }

const saveState = (state: stateObject) => {
    // if (!verifyObject(state)) {} else {}
    localStorage.setItem("clickGame", JSON.stringify(state))
}

const exportState = (state: stateObject) => {
    const stateString = JSON.stringify(state)
    // could add multiple save slots
    // DOM.exportTextInput.setAttribute('value', stateString)
    exportTextInput.value = stateString
    
};

const importState = () => {
    const newState = importTextInput.value;
    if (newState) {
        // should have a confirmation modal warning this will overwrite data
        saveState(JSON.parse(newState));
        location.reload();
    } else {
        console.log("error saving state, new state not found")
        // need the validation in saveState
        // Set up visual error messaging on ui
    }
}
</script>

<template>
    <div id="savePage" class="page">
        <button id="saveStateButton" @click="saveState(state)">Save Game</button>
        <button id="exportStateButton" @click="exportState(state)">Export Game</button>
        <input type="text" id="exportTextInput" @click="importState">
        <button id="importStateButton">Import Game</button>
        <input type="text" id="importTextInput">
    </div> 
</template>