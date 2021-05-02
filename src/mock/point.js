import { getRandomElement, getRandomInteger, generateNewArr, getShuffled} from './utils';
import { TYPES, CITIES, DESCRIPTIONS, OFFERS } from '../util/point.js';

import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const PHOTO_INDEX_MIN = 50;
const PHOTO_INDEX_MAX = 200;
const PHOTO_AMOUNT_MIN = 1;
const PHOTO_AMOUNT_MAX = 40;
const PHOTO_URL = 'http://picsum.photos/248/152?r=';
const MAX_OFFERS = 5;


/**
 * Функция создания набора фотографий
 * @return {array} — массив фото
 */
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


export {createMockPoints};
