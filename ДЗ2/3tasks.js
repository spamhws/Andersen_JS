function makeObjectDeepCopy(original) {
  if (typeof original !== 'object') {
    return undefined;
  }

  const OBJ_COPY = {};

  for (const element in original) {
    const ELEM = original[element];
    if (typeof ELEM !== 'object') {
      OBJ_COPY[element] = ELEM;
    } else if (Array.isArray(ELEM)) {
      OBJ_COPY[element] = [...ELEM];
    } else {
      OBJ_COPY[element] = makeObjectDeepCopy(ELEM);
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

    let index = this.from;
    const LIMIT = this.to;

    return {
      next() {
        if (index <= LIMIT) {
          index++;
          return { value: index - 1, done: false };
        } else return { done: true };
      },
    };
  },
};
