// main.ts
import * as DOM from "./domElements"
import {fetchState, saveState, exportState, importState} from "./save"
import * as COUNTS from "./countChanges";

// buttons
let state = fetchState();
document.getElementById("saveStateButton")?.addEventListener("click", ()=> {saveState(state)});
document.getElementById("exportStateButton")?.addEventListener("click", ()=> {exportState(state)});
document.getElementById("importStateButton")?.addEventListener("click", ()=> {importState()});

document.getElementById("growFoodButton")?.addEventListener("click", ()=> {state = COUNTS.addToFood(1, state)});
document.getElementById("add1Scientist")?.addEventListener("click", ()=> {state = COUNTS.addScientist(1, state)});
document.getElementById("add10Scientist")?.addEventListener("click", ()=> {state = COUNTS.addScientist(10, state)});
document.getElementById("add1colonist")?.addEventListener("click", ()=> {state = COUNTS.addColonists(1, state)});
document.getElementById("add10colonist")?.addEventListener("click", ()=> {state = COUNTS.addColonists(10, state)});
document.getElementById("add100colonist")?.addEventListener("click", ()=> {state = COUNTS.addColonists(100, state)});
document.getElementById("add1Grower")?.addEventListener("click", ()=> {state = COUNTS.addGrower(1,state)});
document.getElementById("add10Grower")?.addEventListener("click", ()=> {state = COUNTS.addGrower(10, state)});
document.getElementById("remove1Scientist")?.addEventListener("click", ()=> {state = COUNTS.removeScientist(1, state)});
document.getElementById("remove10Scientist")?.addEventListener("click", ()=> {state = COUNTS.removeScientist(10, state)});
document.getElementById("remove1Grower")?.addEventListener("click", ()=> {state = COUNTS.removeGrower(1, state)});
document.getElementById("remove10Grower")?.addEventListener("click", ()=> {state = COUNTS.removeGrower(10, state)});


// always running
const gainFoodInterval = setInterval(() => {
    console.log(state)
    state.foodCount += state.foodGain;
    DOM.reloadDisplay(state.foodCount, "food");
}, 1000);
const gainResearchInterval = setInterval(() => {
    state.researchCount += state.researchGain;
    DOM.reloadDisplay(state.researchCount, "research");
}, 1000);

const unlockColonistManagement = setInterval(() => {
    if (state.colonistManagementUnlocked == true || state.colonistCount > 0) {
        document.getElementById("colonistManagementDiv")?.classList.remove("hide")
        state.colonistManagementUnlocked = true;
        clearInterval(unlockColonistManagement);
    } else {return}
}, 1000);

const unlockResearch = setInterval(() => {
    if (state.researchUnlocked == true || state.researchCount > 0) {
        document.getElementById("researchDiv")?.classList.remove("hide");
        document.getElementById("unlockWoodcuttingBox")?.classList.remove("hide");
        console.log("unlocks");
        state.researchUnlocked = true;
        clearInterval(unlockResearch);
    } else {return}
}, 1000);

const newIntervalsAfterWoodcuttingUnlocks = () => {
    const unlockWoodcutters = setInterval(() => {
        if (state.woodcuttersUnlocked == true || state.woodcutterCount > 0) {
            // unlock next bit
            console.log("stonecutting research and pier building unlocked")
            state.woodcuttersUnlocked = true;
            clearInterval(unlockWoodcutters);
        } else {return}
    })
}

// On page load
DOM.reloadAllDisplays(state);


