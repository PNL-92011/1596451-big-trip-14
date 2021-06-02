export const AUTHORIZATION = 'Basic 1577653oaheichyk';
export const END_POINT = 'https://14.ecmascript.pages.academy/big-trip/';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  ABORTING: 'ABORTING',
};

export const SortType = {
  DAY: 'sort-day-up',
  TIME: 'sort-time-down',
  PRICE: 'sort-price-down',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',    /** перерисовка ТМ */
  MINOR: 'MINOR',    /** перерисовка списка ТМ */
  MAJOR: 'MAJOR',    /** перерисовка всего Trip (для применения фильтров и сортировки) */
  INIT: 'INIT',      /** перерисовка при инициализации (при запуске приложения) */
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};


