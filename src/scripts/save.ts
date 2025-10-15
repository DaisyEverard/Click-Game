import type {saveObject} from "./data/types"
import defaultSaveObject from "./data/defaultSaveObject"

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
    console.log("running fetchState")

    if (objectString == "" || objectString == null) {
        console.log("no current state, using defaultSaveObject")
        console.log(defaultSaveObject)
        return defaultSaveObject
    }

    console.log("returning objectString")
    console.log(objectString)
    return JSON.parse(objectString)
}

export {saveState, fetchState}
