import {render} from './util.js';
import {createTripInfo} from './view/trip-info.js';
import {createMenu} from './view/menu.js';
import {createFilters} from './view/filters.js';
import {createTripSort} from './view/trip-sort.js';
import {createTripEventsList} from './view/events-list.js';
import {createEditForm} from './view/edit-form.js';
import {createTripEventsPoint} from './view/events-point.js';


const TRIP_POINTS = 3;

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
  render(tripEvents, createTripEventsPoint(), 'beforeend');
}

// следует ли выделить стоимость поездки в отдельный компонент?
// ???  форма создания / формы редактирования - ???
