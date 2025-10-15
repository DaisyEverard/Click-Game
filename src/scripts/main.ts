// main.ts
import * as DOM from "./domElements"
import {fetchState, saveState} from "./save"

// on load
const state = fetchState();
document.getElementById("saveGameButton")?.addEventListener("click", ()=> {saveState(state)});

const exportState = () => {
    const stateString = JSON.stringify(state)
    // could add multiple save slots
    // DOM.exportTextInput.setAttribute('value', stateString)
    DOM.exportTextInput.value = stateString
};
document.getElementById("exportStateButton")?.addEventListener("click", ()=> {exportState()});

const importState = () => {
    const newState = DOM.importTextInput.value;
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
document.getElementById("importStateButton")?.addEventListener("click", ()=> {importState()});

// Logical methods
const addToFood = (amountToAdd: number) => {
    state.foodCount += amountToAdd;
    DOM.reloadDisplay(state.foodCount, "food");
}
document.getElementById("growFoodButton")?.addEventListener("click", ()=> {addToFood(1)});

const addColonists = (amountToAdd: number) => {
    if (state.foodCount < 10) {
        return;
    }
    if (amountToAdd * 10 > state.foodCount) {
        amountToAdd = Math.floor(state.foodCount/10)
    }
    state.colonistCount += amountToAdd;
    state.foodCount -= amountToAdd * 10;
    state.idleColonistCount += amountToAdd;
    DOM.reloadDisplay(state.colonistCount, "colonist");
    DOM.reloadDisplay(state.idleColonistCount, "idleColonist")
    DOM.reloadDisplay(state.foodCount, "food");
}
document.getElementById("add1colonist")?.addEventListener("click", ()=> {addColonists(1)});
document.getElementById("add10colonist")?.addEventListener("click", ()=> {addColonists(10)});
document.getElementById("add100colonist")?.addEventListener("click", ()=> {addColonists(100)});


// colonist management
const addScientist = (amountToAdd: number) => {
    if (state.idleColonistCount == 0) {
        return;
    }
    if (state.idleColonistCount < amountToAdd) {
        amountToAdd = state.idleColonistCount
    }
    state.idleColonistCount -= amountToAdd;
    state.scientistCount += amountToAdd;
    state.researchGain += amountToAdd;
    DOM.reloadDisplay(state.scientistCount, "scientist");
    DOM.reloadDisplay(state.idleColonistCount, "idleColonist")
}
document.getElementById("add1Scientist")?.addEventListener("click", ()=> {addScientist(1)});
document.getElementById("add10Scientist")?.addEventListener("click", ()=> {addScientist(10)});


const addGrower = (amountToAdd: number) => {
    if (state.idleColonistCount == 0) {
        return;
    }
    if (state.idleColonistCount < amountToAdd) {
        amountToAdd = state.idleColonistCount
    }
    state.idleColonistCount -= amountToAdd;
    state.growerCount += amountToAdd;
    state.foodGain += amountToAdd;
    DOM.reloadDisplay(state.growerCount, "grower");
    DOM.reloadDisplay(state.idleColonistCount, "idleColonist")
}
document.getElementById("add1Grower")?.addEventListener("click", ()=> {addGrower(1)});
document.getElementById("add10Grower")?.addEventListener("click", ()=> {addGrower(10)});



const removeScientist = (amountToRemove: number) => {
    if (state.scientistCount < amountToRemove) {
        amountToRemove = state.scientistCount;
    }
    state.idleColonistCount += amountToRemove;
    state.scientistCount -= amountToRemove;
    state.researchGain -= amountToRemove;
    DOM.reloadDisplay(state.scientistCount, "scientist");
    DOM.reloadDisplay(state.idleColonistCount, "idleColonist")
}
document.getElementById("remove1Scientist")?.addEventListener("click", ()=> {removeScientist(1)});
document.getElementById("remove10Scientist")?.addEventListener("click", ()=> {removeScientist(10)});

const removeGrower = (amountToRemove: number) => {
    if (state.growerCount < amountToRemove) {
        amountToRemove = state.growerCount;
    }
    state.idleColonistCount += amountToRemove;
    state.growerCount -= amountToRemove;
    state.foodGain -= amountToRemove;
    DOM.reloadDisplay(state.growerCount, "grower");
    DOM.reloadDisplay(state.idleColonistCount, "idleColonist")
}
document.getElementById("remove1Grower")?.addEventListener("click", ()=> {removeGrower(1)});
document.getElementById("remove10Grower")?.addEventListener("click", ()=> {removeGrower(10)});


// always running
const gainFoodInterval = setInterval(() => {
    state.foodCount += state.foodGain;
    DOM.reloadDisplay(state.foodCount, "food");
}, 1000);
const gainResearchInterval = setInterval(() => {
    state.researchCount += state.researchGain;
    DOM.reloadDisplay(state.researchCount, "research");
}, 1000);
const unlockColonistManagement = setInterval(() => {
    // also need to check if unlock is true in state when loading an old game
    if (state.colonistCount == 0) {
        return
    } else {
        document.getElementById("colonistManagementDiv")?.classList.remove("hide")
        clearInterval(unlockColonistManagement);
    }
}, 1000);

// On page load
DOM.reloadDisplay(state.foodCount, "food");
DOM.reloadDisplay(state.colonistCount, "colonist");


