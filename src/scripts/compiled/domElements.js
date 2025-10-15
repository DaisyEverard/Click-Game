const foodCountSpan = document.getElementById("foodCountSpan");
const colonistCountSpan = document.getElementById("colonistCountSpan");
const growerCountSpan = document.getElementById("growerCountSpan");
const scientistCountSpan = document.getElementById("scientistCountSpan");
const idleColonistCountSpan = document.getElementById("idleColonistCountSpan");
const researchCountSpan = document.getElementById("researchCountSpan");
const exportTextInput = document.getElementById("exportTextInput");
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
export { reloadDisplay, exportTextInput };
