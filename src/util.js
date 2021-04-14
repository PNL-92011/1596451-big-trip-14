/**
 * Вспомогательная функция для отрисовки компонентов на странице
 * @param {object} container - место, куда помещаем компонент
 * @param {function} template - функция, которая отрисовывает конкретный кусок разметки
 * @param {string} place - место вставки в разметке
 */
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


/**
 * Функция получения случайного целого числа из диапазона
 * @param {number} min — минимальное значение
 * @param {number} max — максимальное значение
 * @returns {number} — случайное число
 */
const getRandomInteger = (min, max) => {
  if (min >= 0 && max >= 0 && max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};


/**
 * Функция получения случайного элемента из массива
 * @param {array} array — массив данных
 * @returns {string} - случайный элемент из массива данных
 */
const getRandomElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};


/**
* Функция перемешивания данных в массиве
* @param {array} arr — массив данных
* @return {array} — итоговый массив
*/
const getShuffled = (arr) => arr.sort(() => {
  return Math.random() - 0.5;
});


/**
 * Функция получения массива произвольной длины
 * с перемешиванием элементов в массиве
 * @param {array} source — массив данных
 * @param {number} maxLength — длина массива
 */
const generateNewArr = ([...source], maxLength) => Array.from(
  { length: Math.min(source.length, 1 + Math.random() * maxLength | 0) },
  () => source.splice(Math.random() * source.length | 0, 1)[0],
);


export {render, getRandomInteger, getRandomElement, generateNewArr, getShuffled};

