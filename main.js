const grid = document.getElementById('grid-container');
const clearBtn = document.getElementById('clear-btn');
const colorButtons = document.querySelectorAll('.cell-color');

let colorMode;

function setGrid(cellsInRow) {
    const cells = cellsInRow ** 2;
    
    for (let i = 0; i < cells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.backgroundColor = "rgb(255, 255, 255)";
        grid.appendChild(cell);
    }

    grid.style.gridTemplateColumns = `repeat(${cellsInRow}, 1fr)`;
}

function colorCell(e) {
    if (!e.target.matches('.cell')) return;
    
    if (colorMode === "addBlack") {
        e.target.style.backgroundColor = addBlack(e.target.style.backgroundColor);
    } else if (colorMode === "random") {
        e.target.style.backgroundColor = randomColor();
    } else {
        e.target.style.backgroundColor = "grey";
    }
}

function randomColor() {
    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);

    return `rgb(${r}, ${g}, ${b})`;
}

function addBlack(elementColor) {
    let newR, newG, newB;
    
    const [r, g, b] = elementColor.slice(4, -1).split(', ');
    
    newR = r - (Math.round((255 / 100) * 10));
    newG = g - (Math.round((255 / 100) * 10));
    newB = b - (Math.round((255 / 100) * 10));
    
    return `rgb(${newR}, ${newG}, ${newB})`;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clearGrid() {
    const cells = grid.querySelectorAll('.cell');
    
    for (let i = 0; i < cells.length; i++) {
        grid.removeChild(cells[i]);
    }
    promptUser();
}

function promptUser() {
    const cellAmount = prompt("How many cells would you like to have in each row?", 10);
    if (!cellAmount) {
        setGrid(10);
        return;
    }

    setGrid(cellAmount);
}

function setColorMode(e) {
    
    if (this.id === "random-btn") {
        colorMode = "random";
    }

    if (this.id === "add-black-btn") {
        colorMode = "addBlack";
    }

    selectBtn(e);
}

function selectBtn(e) {
    colorButtons.forEach(btn => {
        btn.style.transform = "scale(1)";
        btn.style.boxShadow = "none";
    });

    e.target.style.transform = "scale(1.05)";
    e.target.style.boxShadow = "0 0 4px";
}

setGrid(10);
grid.addEventListener('mouseover', colorCell);
clearBtn.addEventListener('click', clearGrid);
colorButtons.forEach(btn => btn.addEventListener('click', setColorMode));