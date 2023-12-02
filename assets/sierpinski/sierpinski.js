const canvas = document.getElementById('sierpinskiCanvas');
const ctx = canvas.getContext('2d');
const depthRange = document.getElementById('depthRange');
const depthValue = document.getElementById('depthValue');
const sideRange = document.getElementById('sideRange');
const sideValue = document.getElementById('sideValue');
const area = document.getElementById('area');
const fractionConstant = 8 / 9;

ctx.imageSmoothingEnabled = false;
ctx.fillStyle = '#d8deec';

function drawSierpinskiCarpet(x, y, size, depth) {
    if (depth === 0) {
        return;
    }

    const newSize = size / 3;
    ctx.fillRect(x + newSize, y + newSize, newSize, newSize); // Rajzol egy négyzetet

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
    const fractionPower = fractionConstant ** iterations;
    const carpetArea = fractionPower * squareArea;

    return carpetArea;
}

function formatNumber(number) {
    return Number.isInteger(number) ? number : number.toFixed(4) + '...';
}

function updateFormula(depth, side, area) {
    const formulaDepthValues = document.querySelectorAll('.formulaDepthValue');
    const formulaSideValues = document.querySelectorAll('.formulaSideValue');
    const formulaFractionValues = document.querySelectorAll('.formulaFractionValue');
    const formulaAreaValues = document.querySelectorAll('.formulaAreaValue');
    const formulaSquareValue = document.getElementById('formulaSquareValue');
    const fraction = formatNumber(fractionConstant ** depth);

    for (const fdv of formulaDepthValues) {
        fdv.textContent = depth;
    }

    for (const fsv of formulaSideValues) {
        fsv.textContent = side;
    }
    
    for (const ffv of formulaFractionValues) {
        ffv.textContent = fraction;
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