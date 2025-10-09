// variables
let count = 10

// dom elements
const totalCard = document.getElementById("totalCard") as HTMLElement;

// Reload methods
const reloadCountDisplay = (count: number) => {
    totalCard.innerHTML = count.toString();
}

// logical methods
const addToCount = (amountToAdd: number) => {
    console.log(typeof(amountToAdd))
    count += amountToAdd;
    reloadCountDisplay(count);
}