const displayInput = document.getElementById("displayInput");
const displayOutput = document.getElementById("displayOutput");
let input = "0";
let nro1 = "";
let op = "";
let nro2 = "";
let result = null;

function appendToDisplay(value) {
  if (input.length < 15) {
    if (result !== null) {
    
      input = result.toString();
      result = null; 
      nro1 = input; 
      op = "";
    }
    if (input === "0" && !"+-*/%".includes(value)) {
      input = value;
      displayInput.value = value;
      nro1 = value;
      op = "";
    } else {
      if (op === "" && "+-*/%".includes(value)) {
        
        input += value;
        displayInput.value = input;
        op = value;
        nro2 = "";
      } else if (op === "" && !"+-*/%".includes(value)) {
        input += value;
        displayInput.value = input;
        nro1 += value;
      } else if (op !== "" && !"+-*/%".includes(value)) {
        input += value;
        displayInput.value = input;
        nro2 += value;
      }
    }
  }
}

function removeLastChar() {
  if (input.length > 1) {
    input = input.slice(0, -1);
    displayInput.value = input;
    if (nro2 !== "" && op !== "") {
      nro2 = nro2.slice(0, -1);
    } else if (op !== "") {
      op = "";
    } else if (nro1 !== "") {
      nro1 = nro1.slice(0, -1);
    }
  } else {
    input = "0";
    displayInput.value = input;
    nro1 = "";
    op = "";
    nro2 = "";
  }
}

function calculateResult() {
  try {
    if (op !== "" && nro2 !== "") {
      const newResult = calculate(nro1, op, nro2);

      
      if (newResult.toString().length > 12) {
        result = parseFloat(newResult.toFixed(12));
      } else {
        result = newResult;
      }

      displayOutput.value = result.toString();
      displayInput.value = nro1 + op + nro2 + " =";
    } else if (result !== null) {
   
      displayOutput.value = result.toString();
      displayInput.value = result.toString();
    }
  } catch (error) {
    displayOutput.value = "Error";
  }
}

function clearDisplay() {
  input = "0";
  displayInput.value = "0";
  displayOutput.value = "0";
  result = null; 
}

function calculate(n1, operator, n2) {
  try {
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);

    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        if (num2 === 0) {
          throw new Error("División por cero");
        }
        return num1 / num2;
      default:
        throw new Error("Operador no válido");
    }
  } catch (error) {
    throw error;
  }
}
