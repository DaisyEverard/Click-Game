<script setup lang="ts">
// main.ts
import * as DOM from "./scripts/domElements"
import {fetchState, saveState, exportState, importState} from "./scripts/save"
import * as COUNTS from "./scripts/countChanges";

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
</script>

<template>
    <!-- HEADER -->
    <header>
        <div id="townTab" class="tab">Town</div>
        <div class="tabSeparator"></div>
        <div id="marketTab" class="tab">Market</div>
    </header>

    <!-- HOME PAGE -->
    <div id="homePage" class="page">
        <div id="totalsDiv" class="section">
            <div>Food Total: <span id="foodCountSpan"></span></div>
        </div>

        <div id="buttonsDiv" class="section">
            <button id="growFoodButton">Grow Food</button><br/>
            <div>
                <button id="add1colonist">Recruit Colonist</button>
                <button id="add10colonist">+10</button>
                <button id="add100colonist">+100</button>
                <span>cost 10 food</span>
            </div>
            
        </div>

        <div id="colonistManagementDiv" class="section hide">
            <div style="font-weight: bolder;">Colonist Total: <span id="colonistCountSpan"></span></div>
            <div style="font-weight: bolder;">Idle Colonists: <span id="idleColonistCountSpan"></span></div>
            <br/>
            <div>
                <button id="remove10Grower">-10</button>
                <button id="remove1Grower">-1</button>
                Growers: <span id="growerCountSpan"></span>
                <button id="add1Grower">+1</button>
                <button id="add10Grower">+10</button>
            </div>

            <div>
                <button id="remove10Scientist">-10</button>
                <button id="remove1Scientist">-1</button>
                Scientists: <span id="scientistCountSpan"></span>
                <button id="add1Scientist">+1</button>
                <button id="add10Scientist">+10</button>
            </div>
        </div>

        <div id="researchDiv" class="section hide">
            <div>research Total: <span id="researchCountSpan"></span></div>
            <br/>
            <div class="hide unlockBox" id="unlockWoodcuttingBox">
                <span class="unlockTitle">Woodcutting</span>
                <span class="unlockCost">Cost: 100 research</span>
                <button id="unlockWoodcuttingButton">Buy</button>
            </div>
        </div>
    </div>

    <!-- SAVE PAGE -->
    <div id="savePage" class="page">
        <button id="saveStateButton">Save Game</button>
        <button id="exportStateButton">Export Game</button>
        <input type="text" id="exportTextInput">
        <button id="importStateButton">Import Game</button>
        <input type="text" id="importTextInput">
    </div> 
</template>

<style scoped>
</style>
