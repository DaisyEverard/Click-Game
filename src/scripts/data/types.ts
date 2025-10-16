type stateObject = {
    foodCount: number,
    colonistCount: number,
    idleColonistCount : number,
    growerCount : number,
    scientistCount : number,
    researchCount : number,
    woodCount: number,
    stoneCount: number,
    metalCount: number,

    foodGain: number,
    researchGain: number,
    woodGain: number,
    stoneGain: number,
    metalGain: number,

    colonistManagementUnlocked: boolean,
    researchUnlocked: boolean,

    woodcuttersUnlocked: boolean,
    minersUnlocked: boolean,
    smithsUnlocked: boolean
}

export type {stateObject}