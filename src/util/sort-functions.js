import dayjs from 'dayjs';
import { FilterType } from '../util/common.js';


/** Функции ранжирования */
export const getRanging = (a,b) => {
  if (a.dateFrom > b.dateFrom) {
    return 1;
  }
  if (a.dateFrom < b.dateFrom) {
    return -1;
  }
};


/** Функции сортировки */
export const sortDay = (A, B) => dayjs(B.dateFrom).diff(dayjs(A.dateFrom));
export const sortTime = (A, B) => dayjs(dayjs(B.dateTill).diff(dayjs(B.dateFrom))).diff(dayjs(dayjs(A.dateTill).diff(dayjs(A.dateFrom))));
export const sortPrice = (A, B) => B.price - A.price;


const isFutureDate = (point) => {
  return dayjs(point.dateTill).isAfter(dayjs(), 'day')
  || dayjs(point.dateFrom).isBefore(dayjs(), 'day')
  && dayjs(point.dateTill).isAfter(dayjs(), 'day');
};

const isPastDate = (point) => {
  return dayjs(point.dateFrom).isBefore(dayjs(), 'day')
  || dayjs(point.dateFrom) === dayjs()
  || dayjs(point.dateFrom).isBefore(dayjs(), 'day')
  && dayjs(point.dateTo).isAfter(dayjs(), 'day');
};

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureDate(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastDate(point)),
};

