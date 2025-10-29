<script setup lang="ts">
import Totals from "./components/TotalsSection.vue";
import { reactive } from 'vue';
import ColonistManagementSection from "./components/ColonistManagementSection.vue";
import ResearchSection from "./components/ResearchSection.vue";
import SavePage from "./components/SavePage.vue";
import defaultSaveObject from "./data/defaultSaveObject";


const fetchState = () => {
    const objectString = localStorage.getItem("clickGame")

    if (objectString == "" || objectString == null) {
        return defaultSaveObject
    }
    return JSON.parse(objectString)
}
const state = reactive(fetchState())

// always running
const gainFoodInterval = setInterval(() => {
    state.foodCount += state.foodGain;
}, 1000);
const gainResearchInterval = setInterval(() => {
    state.researchCount += state.researchGain;
}, 1000);

const unlockColonistManagement = setInterval(() => {
    if (state.colonistManagementUnlocked == true || state.colonistCount > 0) {
        document.getElementById("colonistManagementDiv")?.classList.remove("hide")
        state.colonistManagementUnlocked = true;
        clearInterval(unlockColonistManagement);
        newIntervalAfterColonistManagementUnlocks();
    } else {return}
}, 1000);

const newIntervalAfterColonistManagementUnlocks = () => {
    const unlockResearch = setInterval(() => {
    if (state.researchUnlocked == true || state.researchCount > 0) {
        document.getElementById("researchDiv")?.classList.remove("hide");
        document.getElementById("unlockWoodcuttingBox")?.classList.remove("hide");
        console.log("unlocks");
        state.researchUnlocked = true;
        clearInterval(unlockResearch);
        newIntervalsAfterWoodcuttingUnlocks()
    } else {return}
}, 1000);
}

const newIntervalsAfterWoodcuttingUnlocks = () => {
    const unlockWoodcutters = setInterval(() => {
        if (state.woodcuttersUnlocked == true || state.woodcutterCount > 0) {
            // unlock next bit
            console.log("stonecutting research and pier building unlocked")
            state.woodcuttersUnlocked = true;
            clearInterval(unlockWoodcutters);
        } else {return}
    }, 1000)
}
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
        <Totals :state="state"/>
        <ColonistManagementSection :state="state"/>
        <ResearchSection :state="state"/>  
    </div>

    <!-- SAVE PAGE -->
    <SavePage :state="state"/>
</template>

<style scoped>
</style>
