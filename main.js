"use strict";
// main.ts
//counts
let foodCount = 0;
let colonistCount = 0;
let IdleColonistCount = 0;
let growerCount = 0;
let scientistCount = 0;
let researchCount = 0;
//gains
let foodGain = 0;
let researchGain = 0;
// DOM elements
const foodCountSpan = document.getElementById("foodCountSpan");
const colonistCountSpan = document.getElementById("colonistCountSpan");
const growerCountSpan = document.getElementById("growersCountSpan");
const scientistCountSpan = document.getElementById("scientistsCountSpan");
const idleColonistCountSpan = document.getElementById("idleColonistCountSpan");
// utils
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// Reload displays
const reloadDisplay = (total, displayType) => {
    switch (displayType) {
        case "food":
            foodCountSpan.innerHTML = total.toString();
            break;
        case "colonist":
            colonistCountSpan.innerHTML = total.toString();
        case "grower":
            growerCountSpan.innerHTML = total.toString();
        case "scientist":
            scientistCountSpan.innerHTML = total.toString();
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
    if (amountToAdd * 10 > foodCount) {
        console.log("too expensive");
        // need proper player feedback here
        return;
    }
    colonistCount += amountToAdd;
    foodCount -= amountToAdd * 10;
    foodGain += amountToAdd;
    IdleColonistCount += amountToAdd;
    reloadDisplay(colonistCount, "colonist");
    reloadDisplay(foodCount, "food");
};
// colonist management
const addScientist = (amountToAdd) => {
    if (IdleColonistCount >= amountToAdd) {
        IdleColonistCount -= amountToAdd;
        scientistCount += amountToAdd;
    }
    else {
        console.warn("not enough colonists");
        // need proper player feedback here
    }
};
const addGrower = (amountToAdd) => {
    if (IdleColonistCount >= amountToAdd) {
        IdleColonistCount -= amountToAdd;
        growerCount += amountToAdd;
    }
    else {
        console.warn("not enough colonists");
        // need proper player feedback here
    }
};
const removeScientist = (amountToRemove) => {
    if (scientistCount >= 0) {
        IdleColonistCount += amountToRemove;
        scientistCount -= amountToRemove;
    }
};
const removeGrower = (amountToRemove) => {
    if (growerCount >= 0) {
        IdleColonistCount += amountToRemove;
        growerCount -= amountToRemove;
    }
};
// always running
const gainFoodInterval = setInterval(() => {
    foodCount += foodGain;
    reloadDisplay(foodCount, "food");
}, 1000);
// On page load
reloadDisplay(foodCount, "food");
