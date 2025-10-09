"use strict";
// variables
let count = 0;
// dom elements
const totalCard = document.getElementById("totalCard");
// Reload methods
const reloadCountDisplay = (count) => {
    totalCard.innerHTML = count.toString();
};
// logical methods
const addToCount = (amountToAdd, count) => {
    count += amountToAdd;
    reloadCountDisplay(count);
};
