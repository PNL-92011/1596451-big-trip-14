import { getRandomElement, getRandomInteger, generateNewArr, getShuffled} from './utils';

import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const PHOTO_INDEX_MIN = 50;
const PHOTO_INDEX_MAX = 100;
const PHOTO_AMOUNT_MIN = 1;
const PHOTO_AMOUNT_MAX = 40;
const PHOTO_URL = 'http://picsum.photos/248/152?r=';
const MAX_OFFERS = 5;

const TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
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

  const pictures = new Array(getRandomInteger(PHOTO_AMOUNT_MIN, PHOTO_AMOUNT_MAX)).fill().map(() => `${PHOTO_URL}${getRandomInteger(PHOTO_INDEX_MIN, PHOTO_INDEX_MAX)}`);
  // console.log(pictures);

  const createPhoto = () => {
    return {
      src: getRandomElement(pictures),
      description: getRandomElement(DESCRIPTIONS),
    };
  };

  return new Array(getRandomInteger(1, 5)).fill()
    .map(createPhoto);
};


/**
 * Функция генерирования точки маршрута
 * @return {object} — точка маршрута
 */
export const generatePoint = () => {

  const dateFrom = dayjs().add(getRandomInteger(-7, 7), 'day').add(getRandomInteger(1, 600), 'minute').toDate();
  const dateTill = dayjs(dateFrom).add(getRandomInteger(30, 1400), 'minute').toDate();

  return {
    type: getRandomElement(TYPES),
    destination: {
      city: getRandomElement(CITIES),
      description: getShuffled(DESCRIPTIONS).slice(0, 5).join(' '),
    },
    dateFrom,
    dateTill,
    offers: generateNewArr(OFFERS, MAX_OFFERS),
    price: getRandomInteger(0, 100),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    photos: generatePhotos(),
    id: nanoid(),
  };
};


const createMockPoints = (count) => {
  return new Array(count).fill(null).map(generatePoint);
};
//console.log(createMockPoints(3));

export {createMockPoints, OFFERS, TYPES};