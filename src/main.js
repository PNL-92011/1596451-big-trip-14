import {createTripInfo} from './view/trip-info.js';
import {createMenu} from './view/menu.js';
import {createFilters} from './view/filters.js';
import {createTripSort} from './view/trip-sort.js';
import {createTripEventsList} from './view/trip-events-list.js';
import {createEditForm} from './view/edit-form.js';


//const TRIP_POINTS = 4;

// вспомогательная функция для отрисовки компонентов на странице
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Header
const tripMainHeader = document.querySelector('.trip-main');
const tripMenu = tripMainHeader.querySelector('.trip-controls');
const tripFilter = tripMainHeader.querySelector('.trip-controls__filters');

render(tripMainHeader, createTripInfo(), 'afterbegin');
render(tripMenu, createMenu(), 'afterbegin');
render(tripFilter, createFilters(), 'afterbegin');

// Main
const tripEvents = document.querySelector('.trip-events');
render(tripEvents, createTripSort(), 'afterbegin');
render(tripEvents, createTripEventsList(), 'beforeend');

const tripEventsList = tripEvents.querySelector('.trip-events__list');       // <ul>
render(tripEventsList, createEditForm(), 'beforeend');

// for (let i=0; i < TRIP_POINTS; i++) {                                    // add new point
//   render(tripEvents, (), 'beforeend');
// }
