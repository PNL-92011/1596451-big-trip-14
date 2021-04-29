import { tripPointsData } from '../main.js';
import { formatDayMonth } from '../util/date-format.js';
import {createDomElement} from '../util/common.js';

/**
 * Функция отрисовки маршрута
 * @return {string} — последовательность городов маршрута
 */
const getRoute = (points) => {

  if (points.length === 0) {
    return ' ';
  }

  if (points.length === 1) {
    return points[0].city;
  }

  if (points.length === 2) {
    const tripPointsDataSortByDate = tripPointsData.sort((a, b) => {
      if (a.dateFrom > b.dateFrom) {
        return 1;
      }
      if (a.dateFrom < b.dateFrom) {
        return -1;
      }
    });
    return `<h1 class="trip-info__title">${tripPointsDataSortByDate[0].destination.city} &mdash; ${tripPointsDataSortByDate[1].destination.city}</h1>`;
  }

  if (points.length === 3) {

    const tripPointsDataSortByDate = tripPointsData.sort((a, b) => {
      if (a.dateFrom > b.dateFrom) {
        return 1;
      }
      if (a.dateFrom < b.dateFrom) {
        return -1;
      }
    });
    return `<h1 class="trip-info__title">${tripPointsDataSortByDate[0].destination.city} &mdash; ${tripPointsDataSortByDate[1].destination.city} &mdash; ${tripPointsDataSortByDate[2].destination.city}</h1>`;
  } else

  if (points.length > 3) {

    const tripPointsDataSortByDate = tripPointsData.sort((a, b) => {
      if (a.dateFrom > b.dateFrom) {
        return 1;
      }
      if (a.dateFrom < b.dateFrom) {
        return -1;
      }
    });
    return `<h1 class="trip-info__title">${tripPointsDataSortByDate[0].destination.city} &mdash; ... &mdash; ${tripPointsDataSortByDate[tripPointsDataSortByDate.length - 1].destination.city}</h1>`;
  }
};

const getDateRoute = (points) => {
  if (points.length > 1) {

    const tripPointsDataSortByDate = tripPointsData.sort((a, b) => {
      if (a.dateFrom > b.dateFrom) {
        return 1;
      }
      if (a.dateFrom < b.dateFrom) {
        return -1;
      }
    });
    return `
    <p class="trip-info__dates"> ${formatDayMonth(tripPointsDataSortByDate[0].dateFrom)}&nbsp;&mdash;&nbsp;${formatDayMonth(tripPointsDataSortByDate[tripPointsDataSortByDate.length - 1].dateTill)} </p>`;

  }
};


const createTripInfo = () => {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    ${getRoute(tripPointsData)}

    <p class="trip-info__dates">${getDateRoute(tripPointsData)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>
</section>`;
};


export default class TripInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripInfo();
  }

  getElement() {
    if (!this._element) {
      this._element = createDomElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
