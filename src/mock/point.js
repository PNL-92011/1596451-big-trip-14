import { getRandomElement, getRandomInteger, generateNewArr, getShuffled} from './utils';

import dayjs from 'dayjs';

const PHOTO_LENGTH_MIN = 1;
const PHOTO_LENGTH_MAX = 100;
const PHOTO_AMOUNT_MIN = 1;
const PHOTO_AMOUNT_MAX = 5;
const PHOTO_URL = 'http://picsum.photos/248/152?r=';
const MAX_OFFERS = 5;
const TRIP_POINTS = 15;

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
    nickname: 'luggage',
  },
  {
    name: 'Switch to comfort class',
    price: 100,
    nickname: 'comfort',
  },
  {
    name: 'Add meal',
    price: 15,
    nickname: 'meal',
  },
  {
    name: 'Choose seats',
    price: 5,
    nickname: 'seats',
  },
  {
    name: 'Travel by train',
    price: 40,
    nickname: 'train',
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
 * Функция генерирования точки маршрута
 * @return {object} — точка маршрута
 */
export const generatePoint = () => {

  // const maxDaysGap = 7;
  // const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  // const dateFrom = dayjs().add(daysGap, 'day');
  const dateFrom = dayjs().add(getRandomInteger(-7, 7), 'day').toDate();
  const dateTill = dayjs(dateFrom).add(getRandomInteger(30, 1400), 'minute').toDate();
  // время начала любой ТМ = текущее время (ВСЕГДА)
  // время конца любой ТМ = рандомное в диапазоне
  // дата = рандомная в диапазоне

  return {
    type: getRandomElement(TYPES),
    city: getRandomElement(CITIES),
    description: getShuffled(DESCRIPTIONS).slice(0, 5),
    photos: generatePhotos(),
    dateFrom,
    dateTill,
    offers: generateNewArr(OFFERS, MAX_OFFERS),
    price: getRandomInteger(0, 100),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};


// The array of mock trip-points
const createMockPoints = new Array(TRIP_POINTS).fill(null).map(generatePoint);
//console.log(createMockPoints);

export {createMockPoints, TRIP_POINTS, OFFERS, TYPES};

// Можно ли сочетать два варианта экспорта?
// или если экспортируем более, чем одну сущность - то нужно все указать в конце файла?
