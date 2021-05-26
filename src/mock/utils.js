/**
 * Функция получения случайного целого числа из диапазона
 * @param {number} min — минимальное значение
 * @param {number} max — максимальное значение
 * @returns {number} — случайное число
 */
const getRandomInteger = (a = 0, b = 1) => {
  const min = Math.ceil(Math.min(a,b));
  const max = Math.floor(Math.max(a,b));

  return Math.floor((Math.random() * (max - min + 1)) + min);
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
 * @param {array} arr — массив данных
 * @retern {array} array - новый массив
*/
const generateNewArr = (arr) => {
  const array = [];
  arr.forEach((element) => {
    if (Math.random() < 0.5) {
      array.push(element);
    }
  });
  return array;
};


export {getRandomInteger, getRandomElement, generateNewArr, getShuffled};
