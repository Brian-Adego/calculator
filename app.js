const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator-keys");
const display = calculator.querySelector(".calculator-display");

keys.addEventListener("click", (e) => {
  if (!e.target.closest("button")) return;

  const key = e.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;
  const { type } = key.dataset;
  const { previousKeyType } = calculator.dataset;

  if (type === "number") {
    if (displayValue === "0") {
      display.textContent = keyValue;
    } else if (previousKeyType === "operator") {
      display.textContent = keyValue;
    } else {
      display.textContent = displayValue + keyValue;
    }
  }

  if (type === "operator") {
    const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach((el) => (el.dataset.state = ""));
    key.dataset.state = "selected";

    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  if (type === "equal") {
    //perform a calculation
    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = displayValue;

    display.innerHTML = calculate(firstNumber, operator, secondNumber);
  }

  if (type === "clear") {
    display.innerHTML = "0";
    delete calculator.dataset.firstNumber;
    delete calculator.dataset.operator;
  }

  calculator.dataset.previousKeyType = type;
});

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseInt(firstNumber);
  secondNumber = parseInt(secondNumber);

  let result = "";
  if (operator === "plus") result = firstNumber + secondNumber;
  if (operator === "minus") result = firstNumber - secondNumber;
  if (operator === "times") result = firstNumber * secondNumber;
  if (operator === "divide") result = firstNumber / secondNumber;
  return result;
}

function clearCalculator() {
  const clearKey = document.querySelector('[data-type = "clear"]');
  clearKey.click();
}

function testClearkey() {
  clearCalculator();
  console.assert(
    display.textContent === "0",
    "Clear key. Display should be zero"
  );
  console.assert(
    !calculator.dataset.firstNumber,
    "Clear key. No first number remains"
  );
  console.assert(
    !calculator.dataset.operator,
    "Clear key, No operator remains"
  );
}

const one = document.querySelector("[data-key='1']");
const five = document.querySelector("[data-key='5']");
const nine = document.querySelector("[data-key='9']");

function testKeySequence(...keys) {
  const array = [...keys];

  array.forEach((key) => {
    document.querySelector(`[data-key="${key}"]`).click();
  });
}

testKeySequence("1", "5");

// clearCalculator();
// testClearkey();

// one.click();
// five.click();

// console.assert(display.textContent === "15", "Clicked one and 5");

// clearCalculator();
// testClearkey();

// one.click();
// five.click();
// nine.click();

// console.assert(display.textContent === "159", "Clicked 1, 5, and 9");
// clearCalculator()
// testClearkey()
