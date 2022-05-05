const FIRST_VALUE = prompt('Введите первое значение: ');
const INPUT_ERROR = 'Некорректный ввод!';

if (parseInt(FIRST_VALUE) === +FIRST_VALUE) {
  const SECOND_VALUE = prompt('Введите второе значение: ');

  if (parseInt(SECOND_VALUE) === +SECOND_VALUE) {
    console.log(`Ответ: ${+FIRST_VALUE + +SECOND_VALUE}, ${+FIRST_VALUE / SECOND_VALUE}.`);
  } else {
    console.log(INPUT_ERROR);
  }
} else {
  console.log(INPUT_ERROR);
}
