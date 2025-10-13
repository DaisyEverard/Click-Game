import {saveObject} from "./data/types"
import defaultSaveObject from "data/defaultSaveObject"

// const validateObject = (state: JSON) => {
//     // returns boolean. True = good, False = bad
//     return true
// }

const saveState = (state: saveObject) => {
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

export {saveState, fetchState}
