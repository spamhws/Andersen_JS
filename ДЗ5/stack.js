function checkNumberValidity(input) {
  const result = typeof input === 'number' && isFinite(input);

  if (!result) {
    throw new Error('Number is invalid');
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor(maxSize = 10) {
    checkNumberValidity(maxSize);

    this.first = null;
    this.last = null;
    this.size = 0;
    this.maxSize = maxSize;
  }

  push(value) {
    if (this.size === this.maxSize) {
      throw new Error(`can't push new elements, Stack is full`);
    }

    let node = new Node(value);

    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      let temp = this.first;
      this.first = node;
      this.first.next = temp;
    }

    this.size++;

    return this.size;
  }

  pop() {
    if (!this.first) {
      throw new Error(`Stack is empty, can't use pop()`);
    }

    let temp = this.first;

    if (this.first === this.last) {
      this.last = null;
    }

    this.first = this.first.next;
    this.size--;

    return temp.value;
  }

  peek() {
    if (!this.first) {
      return null;
    }

    return this.first.value;
  }

  isEmpty() {
    return !this.first;
  }

  toArray() {
    let arr = [];

    while (this.first) {
      arr.unshift(this.pop());
    }

    arr.forEach((element) => {
      this.push(element);
    });

    return arr;
  }

  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] !== 'function') {
      throw new Error('Provided data is not iterable');
    }

    let stackfromIterable = new Stack(iterable.length);

    Array.from(iterable).forEach((element) => {
      stackfromIterable.push(element);
    });

    return stackfromIterable;
  }
}

module.exports = { Stack };
