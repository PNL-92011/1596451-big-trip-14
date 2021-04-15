import { getRandomElement, getRandomInteger, generateNewArr, getShuffled} from '../util.js';

import dayjs from 'dayjs';

const PHOTO_LENGTH_MIN = 1;
const PHOTO_LENGTH_MAX = 100;
const PHOTO_AMOUNT_MIN = 1;
const PHOTO_AMOUNT_MAX = 5;
const PHOTO_URL = 'http://picsum.photos/248/152?r=';
const MAX_OFFERS = 5;

const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const CITIES = ['Chamonix', 'Rotterdam', 'Toulouse', 'Paris', 'Zurich', 'Madrid', 'Budapest', 'Izmir', 'Milan'];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const OFFERS = [
  {
    name: 'Add luggage',
    price: 30,
  },
  {
    name: 'Switch to comfort class',
    price: 100,
  },
  {
    name: 'Add meal',
    price: 15,
  },
  {
    name: 'Choose seats',
    price: 5,
  },
  {
    name: 'Travel by train',
    price: 40,
  },
];


/**
 * Функция, возвращающая случайный набор фотографий
 * @return {array} — массив фото
 */
const generatePhotos = () => {
  return new Array(getRandomInteger(PHOTO_AMOUNT_MIN, PHOTO_AMOUNT_MAX)).fill()
    .map(() => `${PHOTO_URL}${getRandomInteger(PHOTO_LENGTH_MIN, PHOTO_LENGTH_MAX)}`);
};


/**
 * Функция, возвращающая случайную дату
 * (в заданном диапазоне)
 * @return {number} — случайная дата
 */
const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').format('DD/MM/YYYY hh:mm');
};
// переписать !!!
// 1) getRandomInteger имеет проверку на отрицательное значение!
// 2) можно ли для моков оставить date_till меньше, чем date_from ?
// нужно ли переводить в JS-формат (toDate)? Как это совместить с форматом?
// нужно ли использовать библиотеку flatpickr.js?  где?


/**
 * Функция, возвращающая новый массив опций произвольной длины
 * @return {array} — массив опций
 */
const generateOffers = () => {
  // const isOffers = Boolean(getRandomInteger(0, 1));
  // if(!isOffers) {
  //   return null;
  // } else {
  return generateNewArr(OFFERS, MAX_OFFERS);
  //}
};


/**
 * Функция генерирования точки маршрута
 * @return {object} — точка маршрута
 */
export const generatePoint = () => {
  return {
    type: getRandomElement(TYPES),
    trip_info: {
      name: getRandomElement(CITIES),

      destination: {
        description: getShuffled(DESCRIPTIONS).slice(0, 5),
        photos: generatePhotos(),
      },
    },

    date_from: generateDate(),
    date_till: generateDate(),

    offers: generateOffers(),
    cost: getRandomInteger(0, 100),

    isFavorite: Boolean(getRandomInteger(0, 1)),
    //isSafed: Boolean(getRandomInteger(0, 1)),
  };
};

//console.log(generatePoint());


// Пометки:

// После выбора пункта назначения появляется блок «Destination». В нём отображается информация о месте назначения (изображения, текст).
// Информация в блоке «Destination» всегда соответствует выбранному пункту назначения.

// Дата и время начала события. Выбор времени и даты осуществляется с помощью библиотеки flatpickr.js.
// Выбранная дата и время отображаются в поле в формате: день/месяц/год часы:минуты (например «25/12/2019 16:00»).
// Дата и время окончания события. Формат и требования аналогичны дате начала. Дата окончания не может быть меньше даты начала события.
