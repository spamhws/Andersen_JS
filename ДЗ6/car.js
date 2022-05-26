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
    if (value?.length > 50) {
      throw new Error('Передано неправильное значение');
    }

    this.#brand = value;
  }

  get brand() {
    return this.#brand;
  }

  set model(value) {
    if (value?.length > 50) {
      throw new Error('Передано неправильное значение');
    }

    this.#model = value;
  }

  get model() {
    return this.#model;
  }

  set yearOfManufacturing(value) {
    const currentYear = new Date().getFullYear();

    if (1900 > value || value > currentYear) {
      throw new Error('Передано неправильное значение');
    }

    this.#yearOfManufacturing = value;
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set maxSpeed(value) {
    if (100 > value || value > 300) {
      throw new Error('Передано неправильное значение');
    }

    this.#maxSpeed = value;
  }

  get maxSpeed() {
    return `${this.#maxSpeed} км/ч`;
  }

  set maxFuelVolume(value) {
    if (value < 5 || value > 20) {
      throw new Error('Передано неправильное значение');
    }

    this.#maxFuelVolume = value;
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
    let fuelLastDigit = this.#currentFuelVolume.toFixed(2).toString().slice(-1);
    let digitIs234 = ['2', '3', '4'].includes(fuelLastDigit);

    switch (true) {
      case fuelLastDigit === 1:
        litr = 'литр';
        break;
      case digitIs234:
        litr = 'литра';
        break;
    }

    return `${this.#currentFuelVolume.toFixed(2)} ${litr}`;
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
    }

    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error('Машина ещё не заведена');
    }

    this.#isStarted = false;
  }

  fillUpGasTank(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Неверное количество топлива для заправки');
    }

    if (this.#currentFuelVolume + amount > this.#maxFuelVolume) {
      throw new Error('Топливный бак переполнен');
    }

    this.#currentFuelVolume += amount;
  }

  drive(speed, hours) {
    let fuelRequired = (speed * hours * this.#fuelConsumption) / 100;

    switch (true) {
      case typeof speed !== 'number' || speed <= 0:
        throw new Error('Неверная скорость');
      case typeof hours !== 'number' || hours <= 0:
        throw new Error('Неверное количество часов');
      case speed > this.#maxSpeed:
        throw new Error('Машина не может ехать так быстро');
      case this.#isStarted === false:
        throw new Error('Машина должна быть заведена, чтобы ехать');
      case fuelRequired > this.#currentFuelVolume:
        throw new Error('Недостаточно топлива');
    }

    this.#currentFuelVolume -= fuelRequired;
    this.#mileage += speed * hours;
  }
}

module.exports = { Car };
