const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');


// Calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber
}

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

// Functions

function sendNumberValue(number) {
    // Replace current display Value if first value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // If the current display value is 0, replace it, if not, add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    // If operator pressed, don't add decimal
    if (awaitingNextValue) return;
    // If no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators at the same time
    if(operator && awaitingNextValue){
        operatorValue = operator; 
        return;
    }
    // Assign firstValue is no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const result = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = result;
        firstValue = result;
    }
    // Ready for the next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

// Reset all values, Display
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Event Listeners
// Add Event Listeners for numbers, operators and decimal buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Event Listener
clearBtn.addEventListener('click', resetAll);