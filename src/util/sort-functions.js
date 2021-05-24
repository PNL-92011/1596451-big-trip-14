import dayjs from 'dayjs';


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


