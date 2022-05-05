const FIRST_VALUE = prompt('Введите первое значение: ');
const SECOND_VALUE = prompt('Введите второе значение: ');

if (parseInt(FIRST_VALUE) === +FIRST_VALUE && parseInt(SECOND_VALUE) === +SECOND_VALUE) {
  console.log((+FIRST_VALUE).toString(+SECOND_VALUE));
} else {
  console.log('Некорректный ввод!');
}
