// Triangle Checker - starter
//
// Read three positive numbers a, b, c and determine:
// 1. whether they can be the sides of a triangle
//    (a + b > c, a + c > b and b + c > a)
// 2. if yes: whether it is a right triangle, and which sides form the right angle
// 3. the area, using Heron's formula:
//    p = (a + b + c) / 2, area = √( p (p - a) (p - b) (p - c) )

const checkButton = document.getElementById("checkButton");
const resultEl = document.getElementById("result");

// --- Pure functions: they only calculate, they do not touch the page ---------

function isTriangle(a, b, c) {
    return (a + b > c) && (a + c > b) && (b + c > a);
}

function rightAngleBetween(a, b, c) {
    
    const eps = 1e-9;
    if (Math.abs(a * a + b * b - c * c) < eps) return "a and b";
    if (Math.abs(a * a + c * c - b * b) < eps) return "a and c";
    if (Math.abs(b * b + c * c - a * a) < eps) return "b and c";
    return null;
}

function heronArea(a, b, c) {
    const p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}

// --- Event handler: reads the inputs, calls the functions, shows the result --

function checkTriangle() {
    // TODO 1: read the three values and convert them with parseFloat()
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const c = parseFloat(document.getElementById("c").value);

    // TODO 2: call the functions above
    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
        resultEl.textContent = "Please enter three valid positive numbers.";
        resultEl.className = "error";
        return;
    }

    if (!isTriangle(a, b, c)) {
        resultEl.textContent = "The given numbers cannot form a triangle.";
        resultEl.className = "error";
        return;
    }

    let message = "Yes, these form a triangle!";
    const rightAngle = rightAngleBetween(a, b, c);
    if (rightAngle) {
        message += ` It is a right triangle (right angle between ${rightAngle}).`;
    } else {
        message += " It is not a right triangle.";
    }

    const area = heronArea(a, b, c);
    message += ` Area: ${area.toFixed(2)}.`;

    // TODO 3: build the message and show it in resultEl (textContent)
    resultEl.textContent = message;
    resultEl.className = "ok";
}

checkButton.addEventListener("click", checkTriangle);