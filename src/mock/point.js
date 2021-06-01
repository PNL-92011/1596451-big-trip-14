import dayjs from 'dayjs';
import { getRandomElement, getRandomInteger } from './utils';
import { TYPES } from '../util/point.js';
import { nanoid } from 'nanoid';

//import { getShuffled } from './utils';
//import { OFFERS } from '../util/point.js';
import { GROUP_OFFERS } from '../util/point.js';
import { generateNewArr } from './utils';

const PHOTO_INDEX_MIN = 50;
const PHOTO_INDEX_MAX = 200;
const PHOTO_AMOUNT_MIN = 1;
const PHOTO_AMOUNT_MAX = 40;
const PHOTO_URL = 'http://picsum.photos/248/152?r=';

const CITIES = ['Chamonix', 'Rotterdam', 'Toulouse', 'Paris', 'Zurich', 'Madrid', 'Budapest', 'Izmir', 'Milan'];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  'Cras aliquet varius magna, non porta ligula feugiat eget. ',
  'Fusce tristique felis at fermentum pharetra. ',
  'Aliquam id orci ut lectus varius viverra. ',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
  'Sed sed nisi sed augue convallis suscipit in sed felis. ',
  'Aliquam erat volutpat. ',
  'Nunc fermentum tortor ac porta dapibus. ',
  'In rutrum ac purus sit amet tempus. ',
];

/**
 * Функция создания набора фотографий */
const generatePhotos = () => {
  const pictures = new Array(getRandomInteger(PHOTO_AMOUNT_MIN, PHOTO_AMOUNT_MAX)).fill().map(() => `${PHOTO_URL}${getRandomInteger(PHOTO_INDEX_MIN, PHOTO_INDEX_MAX)}`);

  const createPhoto = () => {
    return {
      src: getRandomElement(pictures),
      description: getRandomElement(DESCRIPTIONS),
    };
  };

  return new Array(getRandomInteger(1, 5)).fill().map(createPhoto);
};

const generateDestination = (city) => {
  return {
    description: generateNewArr(DESCRIPTIONS).slice(0, (getRandomInteger(0, 5))).join(' '),
    city: city,
    photos: generatePhotos(),
  };
};

export const Destinations = CITIES.map((city) => generateDestination(city));

/**
 * Функция генерирования точки маршрута
 * @return {object} — точка маршрута
 */
export const generatePoint = () => {

  const dateFrom = dayjs().add(getRandomInteger(-7, 7), 'day').add(getRandomInteger(1, 600), 'minute').toDate();
  const dateTill = dayjs(dateFrom).add(getRandomInteger(30, 1400), 'minute').toDate();
  const type = getRandomElement(TYPES);

  return {
    type,
    destination: getRandomElement(Destinations),
    dateFrom,
    dateTill,
    offers:  generateNewArr(GROUP_OFFERS[type]).slice(0, 2),
    price: getRandomInteger(0, 100),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    id: nanoid(),
  };
};

export const createMockPoints = (count) => {
  return new Array(count).fill(null).map(generatePoint);
};

