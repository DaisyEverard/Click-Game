// main.ts

//counts
let foodCount = 0;
let colonistCount = 0;
let idleColonistCount = 0;
let growerCount = 0
let scientistCount = 0
let researchCount = 0

//gains
let foodGain = 0
let researchGain = 0

// DOM elements
const foodCountSpan = document.getElementById("foodCountSpan") as HTMLElement;
const colonistCountSpan = document.getElementById("colonistCountSpan") as HTMLElement;
const growerCountSpan = document.getElementById("growerCountSpan") as HTMLElement;
const scientistCountSpan = document.getElementById("scientistCountSpan") as HTMLElement;
const idleColonistCountSpan = document.getElementById("idleColonistCountSpan") as HTMLElement;

// utils
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Reload displays
const reloadDisplay = (total: number, displayType: string) => {
    switch(displayType){
        case "food":
            foodCountSpan.innerHTML = total.toString();
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
            console.warn("displayType not found")
    }
}

// Logical methods
const addToFood = (amountToAdd: number) => {
    foodCount += amountToAdd;
    reloadDisplay(foodCount, "food");
}
const addColonists = (amountToAdd: number) => {
    if (amountToAdd * 10 > foodCount) {
        console.log("too expensive")
        // need proper player feedback here
        return
    }
    colonistCount += amountToAdd;
    foodCount -= amountToAdd * 10;
    idleColonistCount += amountToAdd;
    reloadDisplay(colonistCount, "colonist");
    reloadDisplay(idleColonistCount, "idleColonist")
    reloadDisplay(foodCount, "food");
}

// colonist management
const addScientist = (amountToAdd: number) => {
    if (idleColonistCount >= amountToAdd) {
        idleColonistCount -= amountToAdd;
        scientistCount += amountToAdd;
        researchGain += amountToAdd;
        reloadDisplay(scientistCount, "scientist");
        reloadDisplay(idleColonistCount, "idleColonist")
    } else {
        console.warn("not enough colonists")
        // need proper player feedback here
    }
}

const addGrower = (amountToAdd: number) => {
    if (idleColonistCount >= amountToAdd) {
        idleColonistCount -= amountToAdd;
        growerCount += amountToAdd;
        foodGain += amountToAdd;
        reloadDisplay(growerCount, "grower");
        reloadDisplay(idleColonistCount, "idleColonist")
    } else {
        console.warn("not enough colonists")
        // need proper player feedback here
    }
}

const removeScientist = (amountToRemove: number) => {
    if (scientistCount > 0) {
        idleColonistCount += amountToRemove;
        scientistCount -= amountToRemove;
        researchGain -= amountToRemove;
        reloadDisplay(scientistCount, "scientist");
        reloadDisplay(idleColonistCount, "idleColonist")
}}

const removeGrower = (amountToRemove: number) => {
    if (growerCount > 0) {
        idleColonistCount += amountToRemove;
        growerCount -= amountToRemove;
        foodGain -= amountToRemove;
        reloadDisplay(growerCount, "grower");
        reloadDisplay(idleColonistCount, "idleColonist")
}}

// always running
const gainFoodInterval = setInterval(() => {
    foodCount += foodGain;
    reloadDisplay(foodCount, "food");
}, 1000);
const gainResearchInterval = setInterval(() => {
    researchCount += researchGain;
    // reloadDisplay(foodCount, "food");
}, 1000);

// On page load
reloadDisplay(foodCount, "food");
reloadDisplay(colonistCount, "colonists")


