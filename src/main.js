import {render, RenderPosition} from './util/render.js';
import {createMockPoints} from './mock/point.js';

import MenuView from './view/trip-menu.js';
import SortView from './view/trip-sorting.js';
import FilterView from './view/trip-filters.js';
import PointsListView from './view/trip-point-list.js';
import TripInfoView from './view/trip-info.js';
import PointView from './view/trip-point.js';
import EditFormView from './view/trip-point-edit.js';
import NewPointView from './view/trip-point-new.js';


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


const renderPoint = (pointsListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditFormView(point);

  const replacePointToEditForm = () => {
    pointsListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceEditFormToPoint = () => {
    pointsListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  // обработчик на стрелку-открытие
  pointComponent.setClickHandler(() => {
    replacePointToEditForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  // обработчик на кнопку Save
  pointEditComponent.setFormHandler(() => {
    replaceEditFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  // обработчик на Cancel
  pointEditComponent.setClickCancelHandler(() => {
    replaceEditFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  // обработчик на стрелку-закрытие
  pointEditComponent.setEditClickHandler(() => {
    replaceEditFormToPoint();
  });

  render(pointsListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};


// Trip-Info
const siteMainHeader = document.querySelector('.trip-main');
const tripInfoComponent = new TripInfoView();
render(siteMainHeader, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);

// Menu
const siteMenu = siteMainHeader.querySelector('.trip-controls');
render(siteMenu, new MenuView().getElement(), RenderPosition.AFTERBEGIN);

// Filter
const siteFilter = siteMainHeader.querySelector('.trip-controls__filters');
render(siteFilter, new FilterView(tripPointsData).getElement(), RenderPosition.AFTERBEGIN);

// Sort
const siteEvents = document.querySelector('.trip-events');
render(siteEvents, new SortView().getElement(), RenderPosition.AFTERBEGIN);

// Point List
render(siteEvents, new PointsListView().getElement(), RenderPosition.BEFOREEND);

// New point
if (!tripPointsData.length) {
  render(siteEvents, new NewPointView().getElement(), RenderPosition.BEFOREEND);
}

// All points
const siteEventsList = siteEvents.querySelector('.trip-events__list');
if (tripPointsData.length > 0) {
  tripPointsDataSortByDate.forEach((point) => renderPoint(siteEventsList, point));
}


export { tripPointsData };
