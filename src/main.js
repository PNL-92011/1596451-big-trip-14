import {render} from './util.js';
import {createTripInfo} from './view/trip-info.js';
import {createMenu} from './view/trip-menu.js';
import {createFilters} from './view/trip-filters.js';
import {createSort} from './view/trip-sorting.js';
import {createPointsList} from './view/trip-point-list.js';
import {editPointForm} from './view/trip-point-edit.js';
//import {createPointForm} from './view/trip-point-new.js';
import {createMockPoints} from './mock/point.js';
import {createTripPoints} from './view/trip-point.js';

const TRIP_POINTS = 4;
const tripPointsData = createMockPoints(TRIP_POINTS);

const tripPointsDataSortByDate = tripPointsData.sort((a, b) => {
  if (a.dateFrom > b.dateFrom) {
    return 1;
  }
  if (a.dateFrom < b.dateFrom) {
    return -1;
  }
});

const siteMainHeader = document.querySelector('.trip-main');
render(siteMainHeader, createTripInfo(), 'afterbegin');

const siteMenu = siteMainHeader.querySelector('.trip-controls');
render(siteMenu, createMenu(), 'afterbegin');

const siteFilter = siteMainHeader.querySelector('.trip-controls__filters');
render(siteFilter, createFilters(), 'afterbegin');

const siteEvents = document.querySelector('.trip-events');
render(siteEvents, createSort(), 'afterbegin');
render(siteEvents, createPointsList(), 'beforeend');


const siteEventsList = siteEvents.querySelector('.trip-events__list');
render(siteEventsList, editPointForm(tripPointsDataSortByDate[0]), 'beforeend');
//render(siteEventsList, createPointForm(tripPointsDataSortByDate[0]), 'beforeend');

for (let i=1; i < TRIP_POINTS; i++) {
  render(siteEventsList, createTripPoints(tripPointsDataSortByDate[i]), 'beforeend');
}

export { tripPointsData };
