const foodCountSpan = document.getElementById("foodCountSpan") as HTMLElement;
const colonistCountSpan = document.getElementById("colonistCountSpan") as HTMLElement;
const growerCountSpan = document.getElementById("growerCountSpan") as HTMLElement;
const scientistCountSpan = document.getElementById("scientistCountSpan") as HTMLElement;
const idleColonistCountSpan = document.getElementById("idleColonistCountSpan") as HTMLElement;
const researchCountSpan = document.getElementById("researchCountSpan") as HTMLElement;

const exportTextInput = document.getElementById("exportTextInput") as HTMLElement;

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

export {
  reloadDisplay, exportTextInput
};