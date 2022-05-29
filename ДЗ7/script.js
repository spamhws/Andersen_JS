const mainDisplay = document.getElementById('main-display');
const secondaryDisplay = document.getElementById('past-display');
const keyboard = document.querySelector('.keyboard');
const copyBtn = document.getElementById('copy-btn');
const memoryContainer = document.querySelector('.memory-slots');
const memorySlots = document.querySelectorAll('.memory-slot');
const memoryButtons = document.querySelector('.memory-buttons');

let leftVariable = 0;
let rightVariable = '';
let currentVariable = 'left';
let currentOperation = 'none';
let afterEquals = false;
let currentSlotNumber = 1;

memoryContainer.addEventListener('click', () => {
  slotSwitch();
});

memoryButtons.addEventListener('click', (e) => {
  let currentMemorySlot = memorySlots[currentSlotNumber - 1].querySelector('span');
  let currentMemoryValue = parseFloat(currentMemorySlot.innerText);

  switch (e.target.id) {
    case 'MC':
      currentMemoryValue = 0;
      break;
    case 'MR':
      displayResult(currentMemoryValue);
      rightVariable = currentMemoryValue;
      break;
    case 'MMinus':
      if (!isNaN(Number(mainDisplay.innerText))) {
        currentMemoryValue -= Number(mainDisplay.innerText);
      }

      break;
    case 'MPlus':
      if (!isNaN(Number(mainDisplay.innerText))) {
        currentMemoryValue += Number(mainDisplay.innerText);
      }

      break;
    default:
      break;
  }

  memorySlots[currentSlotNumber - 1].querySelector('span').innerText = currentMemoryValue;
});

function slotSwitch() {
  memorySlots[currentSlotNumber - 1].setAttribute('data-active', 'false');

  if (currentSlotNumber === 3) {
    currentSlotNumber = 1;
  } else {
    currentSlotNumber += 1;
  }

  memorySlots[currentSlotNumber - 1].setAttribute('data-active', 'true');
}

keyboard.addEventListener('click', (e) => {
  keypressHandler(e.target.innerText);
});

window.addEventListener('keydown', (e) => {
  keypressHandler(e.key);
});

function keypressHandler(input) {
  let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ','];
  let opearations = ['×', '-', '+', '÷', '*', '/'];

  if (digits.includes(input)) {
    digitInputHandler(input);
  }

  if (input === 'C') {
    clearDisplay();
  }

  if (input === '±') {
    displayResult(mainDisplay.innerText * -1);
  }

  if (input === '←' || input === 'Backspace') {
    backspace();
  }

  if (opearations.includes(input)) {
    operation(input);
  }

  if (input === 'Enter' || input === '=') {
    equals();
  }
}

function digitInputHandler(input) {
  if (mainDisplay.innerText === '0' || afterEquals) {
    afterEquals = false;
    mainDisplay.innerText = '';
  }

  if (input === ',') {
    input = '.';
  }

  if (currentVariable === 'right') {
    rightVariable += input;
  }

  displayResult(mainDisplay.innerText + input);
}

function clearDisplay() {
  displayResult('0');
  secondaryDisplay.innerText = '0';
  leftVariable = 0;
  rightVariable = '';
  currentVariable = 'left';
  currentOperation = 'none';
}

function backspace() {
  let resultingValue = mainDisplay.innerText.slice(0, -1);

  if (resultingValue === '' || resultingValue === '-') {
    resultingValue = '0';
  }

  displayResult(resultingValue);
}

function operation(input) {
  if (currentOperation !== 'none' && rightVariable !== '') {
    rightVariable = mainDisplay.innerText;
    equals();
  }

  if (mainDisplay.innerText !== '0') {
    leftVariable = mainDisplay.innerText;
  }

  if (input === '*') {
    input = '×';
  }

  if (input === '/') {
    input = '÷';
  }

  switch (input) {
    case '×':
      currentOperation = 'multiplication';
      break;
    case '-':
      currentOperation = 'subtraction';
      break;
    case '+':
      currentOperation = 'addition';
      break;
    case '÷':
      currentOperation = 'division';
      break;
  }

  secondaryDisplay.innerText = parseFloat(leftVariable) + input;
  displayResult('0');
  rightVariable = '';
  currentVariable = 'right';
}

function equals() {
  if (rightVariable === '') {
    return;
  }

  let result;

  switch (currentOperation) {
    case 'multiplication':
      result = leftVariable * rightVariable;
      break;
    case 'subtraction':
      result = leftVariable - rightVariable;
      break;
    case 'addition':
      result = Number(leftVariable) + Number(rightVariable);
      break;
    case 'division':
      if (rightVariable === '0') {
        result = ` You can't divide by 0!`;
      } else {
        result = leftVariable / rightVariable;
      }

      break;
    case 'none':
      result = parseFloat(mainDisplay.innerText);
      rightVariable = mainDisplay.innerText;
      secondaryDisplay.innerText = '';
      break;
  }

  if (result !== ` You can't divide by 0!`) {
    result = parseFloat(result.toFixed(8));
  }

  if (result < 0) {
    secondaryDisplay.innerText += `${rightVariable}=(${result})`;
  } else {
    secondaryDisplay.innerText += rightVariable + '=' + result;
  }

  displayResult(result);
  leftVariable = 0;
  rightVariable = '';
  currentVariable = 'left';
  currentOperation = 'none';
  afterEquals = true;
}

function displayResult(result) {
  if (result.toString().length > 9) {
    mainDisplay.style.fontSize = `${((80 * 10) / result.toString().length).toFixed(2)}px`;
  } else {
    mainDisplay.style.fontSize = '80px';
  }

  mainDisplay.innerText = result;
}

copyBtn.addEventListener('click', () => {
  copyhandler();
});

function copyhandler() {
  navigator.clipboard.writeText(mainDisplay.innerText);
  alert('Copied to clipboard: ' + mainDisplay.innerText);
}
