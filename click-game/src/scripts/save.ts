import type {stateObject} from "../data/types"
import defaultSaveObject from "../data/defaultSaveObject"
import * as DOM from './domElements'

// const validateObject = (state: JSON) => {
//     // returns boolean. True = good, False = bad
//     return true
// }

const saveState = (state: stateObject) => {
    // if (!verifyObject(state)) {} else {}
    localStorage.setItem("clickGame", JSON.stringify(state))
}

const fetchState = () => {
    const objectString = localStorage.getItem("clickGame")

    if (objectString == "" || objectString == null) {
        return defaultSaveObject
    }
    return JSON.parse(objectString)
}

const exportState = (state: stateObject) => {
    const stateString = JSON.stringify(state)
    // could add multiple save slots
    // DOM.exportTextInput.setAttribute('value', stateString)
    DOM.exportTextInput.value = stateString
};

const importState = () => {
    const newState = DOM.importTextInput.value;
    if (newState) {
        // should have a confirmation modal warning this will overwrite data
        saveState(JSON.parse(newState));
        location.reload();
    } else {
        console.log("error saving state, new state not found")
        // need the validation in saveState
        // Set up visual error messaging on ui
    }
}

export {saveState, fetchState, exportState, importState}
