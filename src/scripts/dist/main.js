// main.ts
import * as DOM from "./domElements";
import { fetchState, saveState } from "./save";
// on load
const state = fetchState();
const saveStateOnClick = () => {
    saveState(state);
};
const exportStateOnClick = () => {
    const stateString = JSON.stringify(fetchState());
    DOM.exportTextInput.innerHTML = stateString;
};
// Logical methods
const addToFood = (amountToAdd) => {
    state.foodCount += amountToAdd;
    DOM.reloadDisplay(state.foodCount, "food");
};
const addColonists = (amountToAdd) => {
    if (state.foodCount < 10) {
        return;
    }
    if (amountToAdd * 10 > state.foodCount) {
        amountToAdd = Math.floor(state.foodCount / 10);
    }
    state.colonistCount += amountToAdd;
    state.foodCount -= amountToAdd * 10;
    state.idleColonistCount += amountToAdd;
    DOM.reloadDisplay(state.colonistCount, "colonist");
    DOM.reloadDisplay(state.idleColonistCount, "idleColonist");
    DOM.reloadDisplay(state.foodCount, "food");
};
// colonist management
const addScientist = (amountToAdd) => {
    if (state.idleColonistCount == 0) {
        return;
    }
    if (state.idleColonistCount < amountToAdd) {
        amountToAdd = state.idleColonistCount;
    }
    state.idleColonistCount -= amountToAdd;
    state.scientistCount += amountToAdd;
    state.researchGain += amountToAdd;
    DOM.reloadDisplay(state.scientistCount, "scientist");
    DOM.reloadDisplay(state.idleColonistCount, "idleColonist");
};
const addGrower = (amountToAdd) => {
    if (state.idleColonistCount == 0) {
        return;
    }
    if (state.idleColonistCount < amountToAdd) {
        amountToAdd = state.idleColonistCount;
    }
    state.idleColonistCount -= amountToAdd;
    state.growerCount += amountToAdd;
    state.foodGain += amountToAdd;
    DOM.reloadDisplay(state.growerCount, "grower");
    DOM.reloadDisplay(state.idleColonistCount, "idleColonist");
};
const removeScientist = (amountToRemove) => {
    if (state.scientistCount < amountToRemove) {
        amountToRemove = state.scientistCount;
    }
    state.idleColonistCount += amountToRemove;
    state.scientistCount -= amountToRemove;
    state.researchGain -= amountToRemove;
    DOM.reloadDisplay(state.scientistCount, "scientist");
    DOM.reloadDisplay(state.idleColonistCount, "idleColonist");
};
const removeGrower = (amountToRemove) => {
    if (state.growerCount < amountToRemove) {
        amountToRemove = state.growerCount;
    }
    state.idleColonistCount += amountToRemove;
    state.growerCount -= amountToRemove;
    state.foodGain -= amountToRemove;
    DOM.reloadDisplay(state.growerCount, "grower");
    DOM.reloadDisplay(state.idleColonistCount, "idleColonist");
};
// always running
const gainFoodInterval = setInterval(() => {
    state.foodCount += state.foodGain;
    DOM.reloadDisplay(state.foodCount, "food");
}, 1000);
const gainResearchInterval = setInterval(() => {
    state.researchCount += state.researchGain;
    DOM.reloadDisplay(state.researchCount, "research");
}, 1000);
// On page load
DOM.reloadDisplay(state.foodCount, "food");
DOM.reloadDisplay(state.colonistCount, "colonist");
