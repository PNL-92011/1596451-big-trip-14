import { tripPointsData } from '../main.js';
import { formatDayMonth } from '../util/date-format.js';
import { getRanging } from '../util/render.js';
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
    return points[0].city;
  }

  if (points.length === 2) {
    const SortedByDate = tripPointsData.sort(getRanging);
    return `<h1 class="trip-info__title">${SortedByDate[0].city} &mdash; ${SortedByDate[1].city}</h1>`;
  }

  if (points.length === 3) {

    const SortedByDate = tripPointsData.sort(getRanging);
    return `<h1 class="trip-info__title">${SortedByDate[0].city} &mdash; ${SortedByDate[1].city} &mdash; ${SortedByDate[2].city}</h1>`;
  } else

  if (points.length > 3) {

    const SortedByDate = tripPointsData.sort(getRanging);
    return `<h1 class="trip-info__title">${SortedByDate[0].city} &mdash; ... &mdash; ${SortedByDate[SortedByDate.length - 1].city}</h1>`;
  }
};

const getDateRoute = (points) => {
  if (points.length > 1) {

    const SortedByDate = tripPointsData.sort(getRanging);
    return `
    <p class="trip-info__dates"> ${formatDayMonth(SortedByDate[0].dateFrom)}&nbsp;&mdash;&nbsp;${formatDayMonth(SortedByDate[SortedByDate.length - 1].dateTill)} </p>`;
  }
};

const getCostRoute = (points) => {

  const basicCost = points.map((point) => point.price).reduce((accumulator, price) => accumulator + price);

  const offersCost = points.map((point) => point.offers.map((offer) => offer.price)
    .reduce((accumulator, price) => accumulator + price))
    .reduce((accumulator, offerPrice) => accumulator + offerPrice);

  return `
  <p class="trip-info__cost">
   Total: &euro;&nbsp;<span class="trip-info__cost-value">${basicCost+offersCost}</span>
 </p>`;
};


const createTripInfo = () => {

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    ${getRoute(tripPointsData)}

    <p class="trip-info__dates">${getDateRoute(tripPointsData)}</p>
  </div>

  ${getCostRoute(tripPointsData)}

 </section>`;
};


export default class TripInfo extends AbstractView {
  getTemplate() {
    return createTripInfo();
  }
}

