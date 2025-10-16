import type { stateObject } from "../data/types";
import * as DOM from "./domElements"

const addToFood = (amountToAdd: number, state: stateObject) => {
    state.foodCount += amountToAdd;
    DOM.reloadDisplay(state.foodCount, "food");
    return state;
}

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
    DOM.reloadDisplay(state.colonistCount, "colonist");
    DOM.reloadDisplay(state.idleColonistCount, "idleColonist")
    DOM.reloadDisplay(state.foodCount, "food");
    return state;
}

const addScientist = (amountToAdd: number, state: stateObject) => {
    if (state.idleColonistCount == 0) {
        return state;
    }
    if (state.idleColonistCount < amountToAdd) {
        amountToAdd = state.idleColonistCount
    }
    state.idleColonistCount -= amountToAdd;
    state.scientistCount += amountToAdd;
    state.researchGain += amountToAdd;
    DOM.reloadDisplay(state.scientistCount, "scientist");
    DOM.reloadDisplay(state.idleColonistCount, "idleColonist");
    return state
}

const addGrower = (amountToAdd: number, state: stateObject) => {
    if (state.idleColonistCount == 0) {
        return state;
    }
    if (state.idleColonistCount < amountToAdd) {
        amountToAdd = state.idleColonistCount
    }
    state.idleColonistCount -= amountToAdd;
    state.growerCount += amountToAdd;
    state.foodGain += amountToAdd;
    DOM.reloadDisplay(state.growerCount, "grower");
    DOM.reloadDisplay(state.idleColonistCount, "idleColonist");
    return state;
}

const removeScientist = (amountToRemove: number, state: stateObject) => {
    if (state.scientistCount < amountToRemove) {
        amountToRemove = state.scientistCount;
    }
    state.idleColonistCount += amountToRemove;
    state.scientistCount -= amountToRemove;
    state.researchGain -= amountToRemove;
    DOM.reloadDisplay(state.scientistCount, "scientist");
    DOM.reloadDisplay(state.idleColonistCount, "idleColonist");
    return state;
}

const removeGrower = (amountToRemove: number, state: stateObject) => {
    if (state.growerCount < amountToRemove) {
        amountToRemove = state.growerCount;
    }
    state.idleColonistCount += amountToRemove;
    state.growerCount -= amountToRemove;
    state.foodGain -= amountToRemove;
    DOM.reloadDisplay(state.growerCount, "grower");
    DOM.reloadDisplay(state.idleColonistCount, "idleColonist");
    return state;
}

export {addToFood, addColonists, addScientist, addGrower, removeScientist, removeGrower}