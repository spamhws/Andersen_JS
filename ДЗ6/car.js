class Car {
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;

  set brand(value) {
    if (value && value.length <= 50) {
      this.#brand = value;
    } else {
      throw new Error('Передано неправильное значение');
    }
  }

  get brand() {
    return this.#brand;
  }

  set model(value) {
    if (value && value.length <= 50) {
      this.#model = value;
    } else {
      throw new Error('Передано неправильное значение');
    }
  }

  get model() {
    return this.#model;
  }

  set yearOfManufacturing(value) {
    const currentYear = new Date().getFullYear();

    if (1900 <= value <= currentYear) {
      this.#yearOfManufacturing = value;
    } else {
      throw new Error('Передано неправильное значение');
    }
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set maxSpeed(value) {
    if (100 <= value && value < 300) {
      this.#maxSpeed = value;
    } else {
      throw new Error('Передано неправильное значение');
    }
  }

  get maxSpeed() {
    return `${this.#maxSpeed} км/ч`;
  }

  set maxFuelVolume(value) {
    if (5 <= value && value <= 20) {
      this.#maxFuelVolume = value;
    } else {
      throw new Error('Передано неправильное значение');
    }
  }

  get maxFuelVolume() {
    return `${this.#maxFuelVolume} l`;
  }

  set fuelConsumption(value) {
    this.#fuelConsumption = (value / 100) * 100;
  }

  get fuelConsumption() {
    return `${this.#fuelConsumption} л/100км`;
  }

  get currentFuelVolume() {
    let litr = 'литров';
    if (this.#currentFuelVolume.toString().slice(-1) === 1) {
      litr = 'литр';
    } else if (['2', '3', '4'].includes(this.#currentFuelVolume.toString().slice(-1))) {
      litr = 'литра';
    }
    return `${this.#currentFuelVolume} ${litr}`;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return `${this.#mileage} км`;
  }

  start() {
    if (this.#isStarted) {
      throw new Error('Машина уже заведена');
    } else {
      this.#isStarted = true;
    }
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error('Машина ещё не заведена');
    } else {
      this.#isStarted = false;
    }
  }

  fillUpGasTank(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Неверное количество топлива для заправки');
    } else {
      this.#currentFuelVolume += amount;

      if (this.#maxFuelVolume < this.#currentFuelVolume) {
        throw new Error('Топливный бак переполнен');
      }
    }
  }

  drive(speed, hours) {
    if (typeof speed !== 'number' || speed <= 0) {
      throw new Error('Неверная скорость');
    } else if (typeof hours !== 'number' || hours <= 0) {
      throw new Error('Неверное количество часов');
    } else if (speed > this.#maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    } else if (this.#isStarted === false) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    } else if ((speed * hours * this.#fuelConsumption) / 100 > this.#currentFuelVolume) {
      throw new Error('Недостаточно топлива');
    }

    this.#currentFuelVolume -= (speed * hours * this.#fuelConsumption) / 100;
    this.#mileage += speed * hours;
  }
}

module.exports = { Car };
