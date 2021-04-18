import {render} from './util.js';
import {createTripInfo} from './view/trip-info.js';
import {createMenu} from './view/trip-menu.js';
import {createFilters} from './view/trip-filters.js';
import {createSort} from './view/trip-sorting.js';
import {createPointsList} from './view/trip-point-list.js';
import {editPointForm} from './view/trip-point-edit.js';
//import {createPointForm} from './view/trip-point-new.js';
import {createMockPoints, TRIP_POINTS} from './mock/point.js';
import {createTripPoints} from './view/trip-point.js';


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
render(siteEventsList, editPointForm(), 'beforeend');
//render(tripEventsList, createPointForm(), 'beforeend');

for (let i=1; i < TRIP_POINTS; i++) {
  render(siteEventsList, createTripPoints(createMockPoints[i]), 'beforeend');
}

