const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
    this.clear();
  }

  clear() {
    this.currentOperation = "";
    this.previousOperation = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperation.includes(".")) return;
    this.currentOperation = this.currentOperation.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperation === "") return;
    if (this.previousOperation !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperation = this.currentOperation;
    this.currentOperation = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperation);
    const current = parseFloat(this.currentOperation);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperation = computation;
    this.operation = undefined;
    this.previousOperation = "";
  }

  updateDisplay() {
    currentOperationText.innerText = this.currentOperation;
    if (this.operation != null) {
      previousOperationText.innerText = `${this.previousOperation} ${this.operation}`;
    } else {
      previousOperationText.innerText = "";
    }
  }
}

const calculator = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.innerText;

    if (isNaN(buttonText)) {
      if (buttonText === ".") {
        calculator.appendNumber(buttonText);
      } else if (buttonText === "=") {
        calculator.compute();
      } else if (["+", "-", "*", "/"].includes(buttonText)) {
        calculator.chooseOperation(buttonText);
      } else if (buttonText === "C") {
        calculator.clear();
      } else if (buttonText === "DEL") {
        calculator.delete();
      }
    } else {
      calculator.appendNumber(buttonText);
    }

    calculator.updateDisplay();
  });
});