// main.ts
import * as DOM from "./domElements"
import * as SAVE from "./save"

//counts
let foodCount = 0;
let colonistCount = 0;
let idleColonistCount = 0;
let growerCount = 0;
let scientistCount = 0;
let researchCount = 0;
let woodCount = 0;
let stoneCount = 0;
let metalCount = 0;

//gains
let foodGain = 0;
let researchGain = 0;
let woodGain = 0;
let stoneGain = 0;
let metalGain = 0;

// Logical methods
const addToFood = (amountToAdd: number) => {
    foodCount += amountToAdd;
    DOM.reloadDisplay(foodCount, "food");
}
const addColonists = (amountToAdd: number) => {
    if (foodCount < 10) {
        return;
    }
    if (amountToAdd * 10 > foodCount) {
        amountToAdd = Math.floor(foodCount/10)
    }
    colonistCount += amountToAdd;
    foodCount -= amountToAdd * 10;
    idleColonistCount += amountToAdd;
    DOM.reloadDisplay(colonistCount, "colonist");
    DOM.reloadDisplay(idleColonistCount, "idleColonist")
    DOM.reloadDisplay(foodCount, "food");
}

// colonist management
const addScientist = (amountToAdd: number) => {
    if (idleColonistCount == 0) {
        return;
    }
    if (idleColonistCount < amountToAdd) {
        amountToAdd = idleColonistCount
    }
    idleColonistCount -= amountToAdd;
    scientistCount += amountToAdd;
    researchGain += amountToAdd;
    DOM.reloadDisplay(scientistCount, "scientist");
    DOM.reloadDisplay(idleColonistCount, "idleColonist")
}

const addGrower = (amountToAdd: number) => {
    if (idleColonistCount == 0) {
        return;
    }
    if (idleColonistCount < amountToAdd) {
        amountToAdd = idleColonistCount
    }
    idleColonistCount -= amountToAdd;
    growerCount += amountToAdd;
    foodGain += amountToAdd;
    DOM.reloadDisplay(growerCount, "grower");
    DOM.reloadDisplay(idleColonistCount, "idleColonist")
}

const removeScientist = (amountToRemove: number) => {
    if (scientistCount < amountToRemove) {
        amountToRemove = scientistCount;
    }
    idleColonistCount += amountToRemove;
    scientistCount -= amountToRemove;
    researchGain -= amountToRemove;
    DOM.reloadDisplay(scientistCount, "scientist");
    DOM.reloadDisplay(idleColonistCount, "idleColonist")
}

const removeGrower = (amountToRemove: number) => {
    if (growerCount < amountToRemove) {
        amountToRemove = growerCount;
    }
    idleColonistCount += amountToRemove;
    growerCount -= amountToRemove;
    foodGain -= amountToRemove;
    DOM.reloadDisplay(growerCount, "grower");
    DOM.reloadDisplay(idleColonistCount, "idleColonist")
}

// always running
const gainFoodInterval = setInterval(() => {
    foodCount += foodGain;
    DOM.reloadDisplay(foodCount, "food");
}, 1000);
const gainResearchInterval = setInterval(() => {
    researchCount += researchGain;
    DOM.reloadDisplay(researchCount, "research");
}, 1000);

// On page load
DOM.reloadDisplay(foodCount, "food");
DOM.reloadDisplay(colonistCount, "colonist");


