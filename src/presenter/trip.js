import MenuView from '../view/trip-menu.js';
import SortView from '../view/trip-sorting.js';
import FilterView from '../view/trip-filters.js';
import PointsListView from '../view/trip-point-list.js';
import TripInfoView from '../view/trip-info.js';
import NewPointView from '../view/trip-point-new.js';
import { render, RenderPosition } from '../util/render.js';
import PointPresenter from '../presenter/point.js';


export default class Trip {
  constructor(tripContainer, tripInfoContainer, tripFilterContainer, tripMenuContainer) {
    this._tripContainer = tripContainer;
    this._tripInfoContainer = tripInfoContainer;
    this._tripFilterContainer = tripFilterContainer;
    this._tripMenuContainer = tripMenuContainer;

    this._pointsListComponent = new PointsListView();
    this._menuComponent = new MenuView();
    this._filterComponent = new FilterView();
    this._sortComponent = new SortView();
    this._newPointComponent = new NewPointView();
    this._tripInfoComponent = new TripInfoView();

    this._pointPresenter = {};
  }

  init(tripPointsData) {
    this._tripPointsData = tripPointsData;
    this._renderTrip();
    this._renderList();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    render(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMenu() {
    render(this._tripMenuContainer, this._menuComponent, RenderPosition.BEFOREEND);
  }

  _renderFilter() {
    render(this._tripFilterContainer, this._filterComponent, RenderPosition.BEFOREEND);
  }

  _renderList() {
    render(this._tripContainer, this._pointsListComponent, RenderPosition.BEFOREEND);
    this._renderPoints();
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent);
    pointPresenter.init(point);
  }

  _renderPoints() {
    this._tripPointsData.forEach((point) => this._renderPoint(point));
  }

  _renderMessage() {
    render(this._tripContainer, this._newPointComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (!this._tripPointsData.length) {
      this._renderMessage();
      return;
    }

    this._renderTripInfo();
    this._renderMenu();
    this._renderFilter();
    this._renderSort();
  }
}


