const canvas = document.getElementById('sierpinskiCanvas');
const ctx = canvas.getContext('2d');
const depthRange = document.getElementById('depthRange');
const depthValue = document.getElementById('depthValue');
const sideRange = document.getElementById('sideRange');
const sideValue = document.getElementById('sideValue');
const area = document.getElementById('area');

ctx.imageSmoothingEnabled = false;

function drawSquare(x, y, size) {
    ctx.fillStyle = '#d8deec';
    ctx.fillRect(x, y, size, size);
}

function drawSierpinskiCarpet(x, y, size, depth) {
    if (depth === 0) {
        return 1;
    }

    const newSize = size / 3;

    drawSquare(x + newSize, y + newSize, newSize);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i !== 1 || j !== 1) {
                drawSierpinskiCarpet(x + i * newSize, y + j * newSize, newSize, depth - 1);
            }
        }
    }
}

// A Sierpinski-szőnyeg megközelítő területének kiszámítása
function calculateArea(sideLength, iterations) {
    const squareArea = sideLength ** 2;
    const carpetArea = (8 / 9) ** iterations * squareArea;

    return carpetArea;
}

function formatNumber(number) {
    if (Number.isInteger(number)) {
        return number;
    }
    else {
        return `${parseFloat(number).toFixed(4)}...`;
    }
}

function updateFormula(depth, side, area) {
    const formulaDepthValues = document.querySelectorAll('.formulaDepthValue');
    const formulaSideValues = document.querySelectorAll('.formulaSideValue');
    const formulaFractionValues = document.querySelectorAll('.formulaFractionValue');
    const formulaAreaValues = document.querySelectorAll('.formulaAreaValue');
    const formulaSquareValue = document.getElementById('formulaSquareValue');

    for (const fdv of formulaDepthValues) {
        fdv.textContent = depth;
    }

    for (const fsv of formulaSideValues) {
        fsv.textContent = side;
    }

    const fraction = formatNumber((8 / 9) ** depth);
    for (const ffv of formulaFractionValues) {
        ffv.textContent = formatNumber(fraction);
    }

    for (const fav of formulaAreaValues) {
        fav.textContent = area;
    }

    formulaSquareValue.textContent = side ** 2;
}

function updateValues() {
    const depth = parseInt(depthRange.value);
    const side = parseInt(sideRange.value);
    depthValue.textContent = depth;
    sideValue.textContent = side;
    const estimatedArea = formatNumber(calculateArea(side, depth));
    area.textContent = estimatedArea;
    updateFormula(depth, side, estimatedArea);
}

function updateDepth() {
    updateValues();

    // Újrarajzolja a Sierpinski-szőnyeget
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(() => {
        drawSierpinskiCarpet(0, 0, canvas.width, parseInt(depthRange.value));
    });
}

updateDepth();

depthRange.addEventListener('input', updateDepth);
sideRange.addEventListener('input', updateValues);