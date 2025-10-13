System.register("domElements", [], function (exports_1, context_1) {
    "use strict";
    var foodCountSpan, colonistCountSpan, growerCountSpan, scientistCountSpan, idleColonistCountSpan, researchCountSpan, exportTextInput, reloadDisplay;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            foodCountSpan = document.getElementById("foodCountSpan");
            colonistCountSpan = document.getElementById("colonistCountSpan");
            growerCountSpan = document.getElementById("growerCountSpan");
            scientistCountSpan = document.getElementById("scientistCountSpan");
            idleColonistCountSpan = document.getElementById("idleColonistCountSpan");
            researchCountSpan = document.getElementById("researchCountSpan");
            exportTextInput = document.getElementById("exportTextInput");
            exports_1("exportTextInput", exportTextInput);
            reloadDisplay = (total, displayType) => {
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
            exports_1("reloadDisplay", reloadDisplay);
        }
    };
});
System.register("data/types", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("data/defaultSaveObject", [], function (exports_3, context_3) {
    "use strict";
    var defaultSaveObject;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            defaultSaveObject = {
                foodCount: 0,
                colonistCount: 0,
                idleColonistCount: 0,
                growerCount: 0,
                scientistCount: 0,
                researchCount: 0,
                woodCount: 0,
                stoneCount: 0,
                metalCount: 0,
                foodGain: 0,
                researchGain: 0,
                woodGain: 0,
                stoneGain: 0,
                metalGain: 0,
                colonistManagementUnlocked: false,
                researchUnlocked: false,
                woodcuttersUnlocked: false,
                minersUnlocked: false,
                smithsUnlocked: false
            };
            exports_3("default", defaultSaveObject);
        }
    };
});
System.register("save", ["data/defaultSaveObject"], function (exports_4, context_4) {
    "use strict";
    var defaultSaveObject_1, saveState, fetchState;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (defaultSaveObject_1_1) {
                defaultSaveObject_1 = defaultSaveObject_1_1;
            }
        ],
        execute: function () {
            // const validateObject = (state: JSON) => {
            //     // returns boolean. True = good, False = bad
            //     return true
            // }
            saveState = (state) => {
                // if (!verifyObject(state)) {} else {}
                localStorage.setItem("clickGame", JSON.stringify(state));
            };
            exports_4("saveState", saveState);
            fetchState = () => {
                const objectString = localStorage.getItem("clickGame");
                if (objectString == "" || objectString == null) {
                    return defaultSaveObject_1.default;
                }
                return JSON.parse(objectString);
            };
            exports_4("fetchState", fetchState);
        }
    };
});
System.register("main", ["domElements", "save"], function (exports_5, context_5) {
    "use strict";
    var DOM, save_1, state, saveStateOnClick, exportStateOnClick, addToFood, addColonists, addScientist, addGrower, removeScientist, removeGrower, gainFoodInterval, gainResearchInterval;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (DOM_1) {
                DOM = DOM_1;
            },
            function (save_1_1) {
                save_1 = save_1_1;
            }
        ],
        execute: function () {
            // on load
            state = save_1.fetchState();
            saveStateOnClick = () => {
                save_1.saveState(state);
            };
            exportStateOnClick = () => {
                const stateString = JSON.stringify(save_1.fetchState());
                DOM.exportTextInput.innerHTML = stateString;
            };
            // Logical methods
            addToFood = (amountToAdd) => {
                state.foodCount += amountToAdd;
                DOM.reloadDisplay(state.foodCount, "food");
            };
            addColonists = (amountToAdd) => {
                if (state.foodCount < 10) {
                    return;
                }
                if (amountToAdd * 10 > state.foodCount) {
                    amountToAdd = Math.floor(state.foodCount / 10);
                }
                state.colonistCount += amountToAdd;
                state.foodCount -= amountToAdd * 10;
                state.idleColonistCount += amountToAdd;
                DOM.reloadDisplay(state.colonistCount, "colonist");
                DOM.reloadDisplay(state.idleColonistCount, "idleColonist");
                DOM.reloadDisplay(state.foodCount, "food");
            };
            // colonist management
            addScientist = (amountToAdd) => {
                if (state.idleColonistCount == 0) {
                    return;
                }
                if (state.idleColonistCount < amountToAdd) {
                    amountToAdd = state.idleColonistCount;
                }
                state.idleColonistCount -= amountToAdd;
                state.scientistCount += amountToAdd;
                state.researchGain += amountToAdd;
                DOM.reloadDisplay(state.scientistCount, "scientist");
                DOM.reloadDisplay(state.idleColonistCount, "idleColonist");
            };
            addGrower = (amountToAdd) => {
                if (state.idleColonistCount == 0) {
                    return;
                }
                if (state.idleColonistCount < amountToAdd) {
                    amountToAdd = state.idleColonistCount;
                }
                state.idleColonistCount -= amountToAdd;
                state.growerCount += amountToAdd;
                state.foodGain += amountToAdd;
                DOM.reloadDisplay(state.growerCount, "grower");
                DOM.reloadDisplay(state.idleColonistCount, "idleColonist");
            };
            removeScientist = (amountToRemove) => {
                if (state.scientistCount < amountToRemove) {
                    amountToRemove = state.scientistCount;
                }
                state.idleColonistCount += amountToRemove;
                state.scientistCount -= amountToRemove;
                state.researchGain -= amountToRemove;
                DOM.reloadDisplay(state.scientistCount, "scientist");
                DOM.reloadDisplay(state.idleColonistCount, "idleColonist");
            };
            removeGrower = (amountToRemove) => {
                if (state.growerCount < amountToRemove) {
                    amountToRemove = state.growerCount;
                }
                state.idleColonistCount += amountToRemove;
                state.growerCount -= amountToRemove;
                state.foodGain -= amountToRemove;
                DOM.reloadDisplay(state.growerCount, "grower");
                DOM.reloadDisplay(state.idleColonistCount, "idleColonist");
            };
            // always running
            gainFoodInterval = setInterval(() => {
                state.foodCount += state.foodGain;
                DOM.reloadDisplay(state.foodCount, "food");
            }, 1000);
            gainResearchInterval = setInterval(() => {
                state.researchCount += state.researchGain;
                DOM.reloadDisplay(state.researchCount, "research");
            }, 1000);
            // On page load
            DOM.reloadDisplay(state.foodCount, "food");
            DOM.reloadDisplay(state.colonistCount, "colonist");
        }
    };
});
