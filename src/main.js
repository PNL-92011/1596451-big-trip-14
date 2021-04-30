import {renderElement, RenderPosition} from './util/common.js';
import {createMockPoints} from './mock/point.js';

import MenuView from './view/trip-menu.js';
import SortView from './view/trip-sorting.js';
import FilterView from './view/trip-filters.js';
import PointsListView from './view/trip-point-list.js';
import TripInfoView from './view/trip-info.js';
import TripPointView from './view/trip-point.js';
import EditFormView from './view/trip-point-edit.js';


const TRIP_POINTS = 3;
const tripPointsData = createMockPoints(TRIP_POINTS);

const tripPointsDataSortByDate = tripPointsData.sort((a, b) => {
  if (a.dateFrom > b.dateFrom) {
    return 1;
  }
  if (a.dateFrom < b.dateFrom) {
    return -1;
  }
});

// Trip-Info
const siteMainHeader = document.querySelector('.trip-main');
const tripInfoComponent = new TripInfoView();
renderElement(siteMainHeader, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);

// Menu
const siteMenu = siteMainHeader.querySelector('.trip-controls');
renderElement(siteMenu, new MenuView().getElement(), RenderPosition.AFTERBEGIN);

// Filter
const siteFilter = siteMainHeader.querySelector('.trip-controls__filters');
renderElement(siteFilter, new FilterView(tripPointsData).getElement(), RenderPosition.AFTERBEGIN);

// Sort
const siteEvents = document.querySelector('.trip-events');
renderElement(siteEvents, new SortView().getElement(), RenderPosition.AFTERBEGIN);

// Point List
renderElement(siteEvents, new PointsListView().getElement(), RenderPosition.BEFOREEND);

// Edit Form
const siteEventsList = siteEvents.querySelector('.trip-events__list');
renderElement(siteEventsList, new EditFormView(tripPointsDataSortByDate[0]).getElement(), RenderPosition.BEFOREEND);

// All points
for (let i=0; i < TRIP_POINTS; i++) {
  renderElement(siteEventsList, new TripPointView(tripPointsDataSortByDate[i]).getElement(), RenderPosition.BEFOREEND);
}


export { tripPointsData };
