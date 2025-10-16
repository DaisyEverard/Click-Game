import type { stateObject } from "./data/types";

const foodCountSpan = document.getElementById("foodCountSpan") as HTMLElement;
const colonistCountSpan = document.getElementById("colonistCountSpan") as HTMLElement;
const growerCountSpan = document.getElementById("growerCountSpan") as HTMLElement;
const scientistCountSpan = document.getElementById("scientistCountSpan") as HTMLElement;
const idleColonistCountSpan = document.getElementById("idleColonistCountSpan") as HTMLElement;
const researchCountSpan = document.getElementById("researchCountSpan") as HTMLElement;

const exportTextInput = document.getElementById("exportTextInput") as HTMLInputElement;
const importTextInput = document.getElementById("importTextInput") as HTMLInputElement;

const reloadDisplay = (total: number, displayType: string) => {
    switch(displayType){
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
            console.warn("displayType not found")
    }
}

const reloadAllDisplays = (state: stateObject) => {
    foodCountSpan.innerHTML = state.foodCount.toString();
    researchCountSpan.innerHTML = state.researchCount.toString();
    colonistCountSpan.innerHTML = state.colonistCount.toString();
    idleColonistCountSpan.innerHTML = state.idleColonistCount.toString();
    growerCountSpan.innerHTML = state.growerCount.toString();
    scientistCountSpan.innerHTML = state.scientistCount.toString();
}

export {
  reloadDisplay, reloadAllDisplays, exportTextInput, importTextInput
};