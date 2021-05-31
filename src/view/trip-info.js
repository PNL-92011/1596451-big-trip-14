// import { tripPointsData } from '../main.js';
import { formatDayMonth } from '../util/date-format.js';
import { getRanging } from '../util/sort-functions.js';
import AbstractView from './abstract.js';

/**
 * Функция отрисовки маршрута
 * @return {string} — последовательность городов маршрута
 */
const getRoute = (points) => {

  if (points.length === 0) {
    return ' ';
  }

  if (points.length === 1) {
    return points[0].destination.city;
  }

  if (points.length === 2) {
    const SortedByDate = points.sort(getRanging);
    return `<h1 class="trip-info__title">${SortedByDate[0].destination.city} &mdash; ${SortedByDate[1].destination.city}</h1>`;
  }

  if (points.length === 3) {

    const SortedByDate = points.sort(getRanging);
    return `<h1 class="trip-info__title">${SortedByDate[0].destination.city} &mdash; ${SortedByDate[1].destination.city} &mdash; ${SortedByDate[2].destination.city}</h1>`;
  } else

  if (points.length > 3) {

    const SortedByDate = points.sort(getRanging);
    return `<h1 class="trip-info__title">${SortedByDate[0].destination.city} &mdash; ... &mdash; ${SortedByDate[SortedByDate.length - 1].destination.city}</h1>`;
  }
};


const getDateRoute = (points) => {
  if (points.length) {

    const SortedByDate = points.sort(getRanging);
    return `
    <p class="trip-info__dates"> ${formatDayMonth(SortedByDate[0].dateFrom)}&nbsp;&mdash;&nbsp;${formatDayMonth(SortedByDate[SortedByDate.length - 1].dateTill)} </p>`;
  }
};

const getCostRoute = (points) => {

  const basicCost = points.map((point) => point.price).reduce((accumulator, price) => accumulator + price);

  // const offersCost = points.map((point) => point.offers.map((offer) => offer.price)
  //   .reduce((accumulator, price) => accumulator + price))
  //   .reduce((accumulator, offerPrice) => accumulator + offerPrice);

  return `
  <p class="trip-info__cost">
   Total: &euro;&nbsp;<span class="trip-info__cost-value">${basicCost}</span>
 </p>`;
};


const createTripInfo = (pointsData) => {

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    ${getRoute(pointsData)}

    <p class="trip-info__dates">${getDateRoute(pointsData)}</p>
  </div>

  ${getCostRoute(pointsData)}

 </section>`;
};


export default class TripInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  init(points) {
    this._points = points;
  }
  getTemplate() {
    return createTripInfo(this._points);
  }
}

