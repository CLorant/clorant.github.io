const canvas = document.getElementById('sierpinskiCanvas');
const ctx = canvas.getContext('2d');
const depthRange = document.getElementById('depthRange');
const depthValue = document.getElementById('depthValue');
const sideRange = document.getElementById('sideRange');
const sideValue = document.getElementById('sideValue');
const areaElement = document.getElementById('area');

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

function updateDepth() {
    const depth = parseInt(depthRange.value);
    const side = parseInt(sideRange.value);
    depthValue.textContent = depth;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(() => {
        drawSierpinskiCarpet(0, 0, canvas.width, depth);
        const estimatedArea = calculateArea(side, depth);
        areaElement.textContent = Number.isInteger(estimatedArea) ? estimatedArea : estimatedArea.toFixed(2);
    });
}

function updateSide() {
    const side = parseInt(sideRange.value);
    sideValue.textContent = side;

    const estimatedArea = calculateArea(side, depthRange.value);
    areaElement.textContent = Number.isInteger(estimatedArea) ? estimatedArea : estimatedArea.toFixed(2);
}

updateDepth();
updateSide();

depthRange.addEventListener('input', updateDepth);
sideRange.addEventListener('input', updateSide);
