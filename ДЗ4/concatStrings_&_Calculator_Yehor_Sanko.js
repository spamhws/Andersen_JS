// Task 1, concatStrings function:

let currentString = '';
let currentSeparator = '';

function concatStrings(string, separator) {
  if (typeof string === 'string') {
    currentString += string;

    if (typeof separator === 'string') {
      currentSeparator = separator;
    }

    currentString += currentSeparator;

    return concatStrings;
  }

  if (currentSeparator.length) {
    currentString = currentString.slice(0, -currentSeparator.length);
  }

  const result = currentString;

  currentString = '';
  currentSeparator = '';

  return result;
}

// Task 2, Calculator Class:

function checkNumberValidity(input) {
  let result = typeof input === 'number' && isFinite(input);

  if (!result) {
    throw new Error('Invalid parameters passed to the Class');
  }
}

class Calculator {
  constructor(numX, numY) {
    checkNumberValidity(numX);
    checkNumberValidity(numY);
    this.numX = numX;
    this.numY = numY;
  }

  setX = (num) => {
    checkNumberValidity(num);
    this.numX = num;
  };

  setY = (num) => {
    checkNumberValidity(num);
    this.numY = num;
  };

  logSum = () => {
    console.log(this.numX + this.numY);
  };

  logMul = () => {
    console.log(this.numX * this.numY);
  };

  logSub = () => {
    console.log(this.numX - this.numY);
  };

  logDiv = () => {
    if (this.numY === 0) {
      throw new Error(`Second argument can't equal to 0`);
    }

    console.log(parseFloat((this.numX / this.numY).toFixed(2)));
  };
}
