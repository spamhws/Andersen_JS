//Filter implementation:

Array.prototype.myFilter = function (callbackFunc, thisArg) {
  let resultArr = [];

  this.forEach((element, i) => {
    if (callbackFunc.call(thisArg, this[i], i, this)) {
      resultArr.push(this[i]);
    }
  });

  return resultArr;
};

//createDebounceFunction:

let arrayOfTimeouts = [];

function createDebounceFunction(callbackFunc, delay) {
  let timedFunc = function () {
    arrayOfTimeouts.forEach((element) => {
      if (element.func === callbackFunc) {
        clearTimeout(element.timeout);
        arrayOfTimeouts = arrayOfTimeouts.filter((item) => item !== element);
      }
    });

    let myTimeout = setTimeout(() => {
      callbackFunc();
      arrayOfTimeouts.forEach((element, i) => {
        if (JSON.stringify(arrayOfTimeouts[i]) === JSON.stringify({ timeout: myTimeout, func: callbackFunc })) {
          arrayOfTimeouts.splice(i, 1);
        }
      });
    }, delay);

    arrayOfTimeouts.push({ timeout: myTimeout, func: callbackFunc });
  };

  return timedFunc;
}
