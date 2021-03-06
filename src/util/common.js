//import exports from "webpack";

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};


export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
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
  PATCH: 'PATCH',    // перерисовка ТМ
  MINOR: 'MINOR',    // перерисовка списка ТМ
  MAJOR: 'MAJOR',    // перерисовка всего Trip (для применения фильтров и сортировки)
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};
