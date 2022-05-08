function makeObjectDeepCopy(original) {
  if (typeof original !== 'object') {
    return undefined;
  }

  const OBJ_COPY = {};

  for (const element in original) {
    if (typeof original[element] !== 'object') {
      OBJ_COPY[element] = original[element];
    } else if (Array.isArray(original[element]) === true) {
      OBJ_COPY[element] = [...original[element]];
    } else {
      OBJ_COPY[element] = makeObjectDeepCopy(original[element]);
    }
  }

  return OBJ_COPY;
}

function selectFromInterval(initialArray, firstInterval, secondInterval) {
  const VALIDITY_CHECK =
    isInt(firstInterval) &&
    isInt(secondInterval) &&
    initialArray.every((element) => {
      return isInt(element);
    });

  function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) === value && !isNaN(parseInt(value, 10));
  }

  if (!VALIDITY_CHECK) {
    throw new Error('Invalid parameters');
  }

  if (firstInterval > secondInterval) {
    [firstInterval, secondInterval] = [secondInterval, firstInterval];
  }

  let newArray = [];

  initialArray.forEach((element) => {
    if (element >= firstInterval && element <= secondInterval) {
      newArray.push(element);
    }
  });

  return newArray;
}

const myIterable = {
  from: 1,
  to: 4,
  [Symbol.iterator]() {
    if (this.from > this.to || !isInt(this.from) || !isInt(this.to)) {
      throw new Error('Ошибка!');
    }

    function isInt(value) {
      return !isNaN(value) && parseInt(Number(value)) === value && !isNaN(parseInt(value, 10));
    }

    let values = Object.values(this);
    let index = this.from;
    let limit = this.to;

    return {
      next() {
        if (index <= limit) {
          index++;
          return { value: index - 1, done: false };
        } else return { done: true };
      },
    };
  },
};
