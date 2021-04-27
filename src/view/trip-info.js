import { tripPointsData } from '../main.js';
import { formatDayMonth } from '../util.js';

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


export const createTripInfo = () => {
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


// Наименование маршрута путешествия формируется автоматически и состоит из пунктов назначения (названий городов), разделённых тире: «Amsterdam — Geneva — Chamonix».
// Если городов больше 3-х, то в наименовании маршрута отображается первый и последний город, разделённые многоточием: «Amsterdam —... — Chamonix».

// Даты путешествия в шапке заполняются автоматически.
// Дата начала всего путешествия соответствует дате начала первой точки маршрута.
// Дата окончания — дате завершения последней точки маршрута. Например, «18 AUG — 6 OCT».
