import MenuView from '../view/trip-menu.js';
import SortView from '../view/trip-sorting.js';
import FilterView from '../view/trip-filters.js';
import PointsListView from '../view/trip-point-list.js';
import TripInfoView from '../view/trip-info.js';
import NewPointView from '../view/trip-point-new.js';
import { render, RenderPosition } from '../util/render.js';
import PointPresenter from '../presenter/point.js';


export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._pointPresenter = {};

    this._sortComponent = new SortView();
    this._pointsListComponent = new PointsListView();
    this._newPointComponent = new NewPointView();

    this._tripInfoComponent = new TripInfoView();
    this._menuComponent = new MenuView();
    this._filterComponent = new FilterView();

  }

  init(tripPointsData) {
    this._tripPointsData = tripPointsData;
    this._renderTrip();
    //this._renderList();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }


  _renderTripInfo() {
    render(this._tripContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMenu() {
    render(this._tripContainer, this._menuComponent, RenderPosition.BEFOREEND);
  }

  _renderFilter() {
    render(this._tripContainer, this._filterComponent, RenderPosition.BEFOREEND);
  }


  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent);
    pointPresenter.init(point);
  }

  _renderPoints() {
    this._tripPointsData.forEach((tripPointsData) => this._renderPoint(tripPointsData));
  }

  _renderList() {
    render(this._tripContainer, this._pointsListComponent, RenderPosition.BEFOREEND);
    this._renderPoints();
  }

  _renderMessage() {
    render(this._tripContainer, this._newPointComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._tripPointsData < 1) {
      this._renderMessage();
      return;
    }
    this._renderTripInfo();
    this._renderMenu();
    this._renderFilter();
    this._renderSort();
    //this._renerList();
  }
}


