"use strict";
// main.ts
//counts
let foodCount = 0;
let colonistCount = 0;
let idleColonistCount = 0;
let growerCount = 0;
let scientistCount = 0;
let researchCount = 0;
//gains
let foodGain = 0;
let researchGain = 0;
// DOM elements
const foodCountSpan = document.getElementById("foodCountSpan");
const colonistCountSpan = document.getElementById("colonistCountSpan");
const growerCountSpan = document.getElementById("growerCountSpan");
const scientistCountSpan = document.getElementById("scientistCountSpan");
const idleColonistCountSpan = document.getElementById("idleColonistCountSpan");
const researchCountSpan = document.getElementById("researchCountSpan");
// utils
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// Reload displays
const reloadDisplay = (total, displayType) => {
    switch (displayType) {
        case "food":
            foodCountSpan.innerHTML = total.toString();
            break;
        case "research":
            researchCountSpan.innerHTML = total.toString();
            break;
        case "colonist":
            colonistCountSpan.innerHTML = total.toString();
            break;
        case "idleColonist":
            idleColonistCountSpan.innerHTML = total.toString();
            break;
        case "grower":
            growerCountSpan.innerHTML = total.toString();
            break;
        case "scientist":
            scientistCountSpan.innerHTML = total.toString();
            break;
        default:
            console.warn("displayType not found");
    }
};
// Logical methods
const addToFood = (amountToAdd) => {
    foodCount += amountToAdd;
    reloadDisplay(foodCount, "food");
};
const addColonists = (amountToAdd) => {
    if (foodCount < 10) {
        return;
    }
    if (amountToAdd * 10 > foodCount) {
        amountToAdd = Math.floor(foodCount / 10);
    }
    colonistCount += amountToAdd;
    foodCount -= amountToAdd * 10;
    idleColonistCount += amountToAdd;
    reloadDisplay(colonistCount, "colonist");
    reloadDisplay(idleColonistCount, "idleColonist");
    reloadDisplay(foodCount, "food");
};
// colonist management
const addScientist = (amountToAdd) => {
    if (idleColonistCount == 0) {
        return;
    }
    if (idleColonistCount < amountToAdd) {
        amountToAdd = idleColonistCount;
    }
    idleColonistCount -= amountToAdd;
    scientistCount += amountToAdd;
    researchGain += amountToAdd;
    reloadDisplay(scientistCount, "scientist");
    reloadDisplay(idleColonistCount, "idleColonist");
};
const addGrower = (amountToAdd) => {
    if (idleColonistCount == 0) {
        return;
    }
    if (idleColonistCount < amountToAdd) {
        amountToAdd = idleColonistCount;
    }
    idleColonistCount -= amountToAdd;
    growerCount += amountToAdd;
    foodGain += amountToAdd;
    reloadDisplay(growerCount, "grower");
    reloadDisplay(idleColonistCount, "idleColonist");
};
const removeScientist = (amountToRemove) => {
    if (scientistCount < amountToRemove) {
        amountToRemove = scientistCount;
    }
    idleColonistCount += amountToRemove;
    scientistCount -= amountToRemove;
    researchGain -= amountToRemove;
    reloadDisplay(scientistCount, "scientist");
    reloadDisplay(idleColonistCount, "idleColonist");
};
const removeGrower = (amountToRemove) => {
    if (growerCount < amountToRemove) {
        amountToRemove = growerCount;
    }
    idleColonistCount += amountToRemove;
    growerCount -= amountToRemove;
    foodGain -= amountToRemove;
    reloadDisplay(growerCount, "grower");
    reloadDisplay(idleColonistCount, "idleColonist");
};
// always running
const gainFoodInterval = setInterval(() => {
    foodCount += foodGain;
    reloadDisplay(foodCount, "food");
}, 1000);
const gainResearchInterval = setInterval(() => {
    researchCount += researchGain;
    reloadDisplay(researchCount, "research");
}, 1000);
// On page load
reloadDisplay(foodCount, "food");
reloadDisplay(colonistCount, "colonist");
