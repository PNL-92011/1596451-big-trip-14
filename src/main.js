import {render} from './util.js';
import {createTripInfo} from './view/trip-info.js';
import {createMenu} from './view/menu.js';
import {createFilters} from './view/filters.js';
import {createTripSort} from './view/trip-sort.js';
import {createTripEventsList} from './view/events-list.js';
import {createEditForm} from './view/edit-form.js';
import {createTripEventsPoint} from './view/events-point.js';
import {generatePoint} from './mock/mock-point.js';


const TRIP_POINTS = 15;

const createMockPoints = (TRIP_POINTS) => new Array(TRIP_POINTS).fill(null).map(() => generatePoint());
console.log(createMockPoints(TRIP_POINTS));


const tripMainHeader = document.querySelector('.trip-main');
const tripMenu = tripMainHeader.querySelector('.trip-controls');
const tripFilter = tripMainHeader.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');


render(tripMainHeader, createTripInfo(), 'afterbegin');
render(tripMenu, createMenu(), 'afterbegin');
render(tripFilter, createFilters(), 'afterbegin');
render(tripEvents, createTripSort(), 'afterbegin');
render(tripEvents, createTripEventsList(), 'beforeend');

const tripEventsList = tripEvents.querySelector('.trip-events__list');
render(tripEventsList, createEditForm(), 'beforeend');

for (let i=0; i < TRIP_POINTS; i++) {
  render(tripEventsList, createTripEventsPoint(), 'beforeend');
}

// делаем два отдельных компонента: и для создания формы и для редактирования формы

