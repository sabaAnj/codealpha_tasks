const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");
const buttons = document.querySelectorAll("button");

let current = "";
let previous = "";
let operator = null;

function updateDisplay() {
    currentDisplay.textContent = current || "0";
    previousDisplay.textContent = operator ? previous + " " + operator : "";
}

function appendNumber(num) {
    if (num === "." && current.includes(".")) return;
    current += num;
}

function setOperator(op) {
    if (current === "") return;

    if (previous !== "") compute();

    operator = op;
    previous = current;
    current = "";
}

function compute() {
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    if (isNaN(prev) || isNaN(curr)) return;

    let result;

    switch(operator) {
        case "+": result = prev + curr; break;
        case "−": result = prev - curr; break;
        case "×": result = prev * curr; break;
        case "÷":
            if (curr === 0) return showError();
            result = prev / curr;
            break;
        case "%":
            if (curr === 0) return showError();
            result = prev % curr;
            break;
        default: return;
    }

    current = result.toString();
    previous = "";
    operator = null;
}

function showError() {
    current = "Error";
    previous = "";
    operator = null;
    updateDisplay();
}

function clearAll() {
    current = "";
    previous = "";
    operator = null;
}

function deleteLast() {
    current = current.slice(0, -1);
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value) || value === ".") appendNumber(value);
        else if (value === "C") clearAll();
        else if (value === "DEL") deleteLast();
        else if (value === "=") compute();
        else setOperator(value);

        updateDisplay();
    });
});

document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || e.key === ".") appendNumber(e.key);
    if (e.key === "+") setOperator("+");
    if (e.key === "-") setOperator("−");
    if (e.key === "*") setOperator("×");
    if (e.key === "/") setOperator("÷");
    if (e.key === "%") setOperator("%");
    if (e.key === "Enter") compute();
    if (e.key === "Backspace") deleteLast();
    if (e.key === "Escape") clearAll();

    updateDisplay();
});

updateDisplay();