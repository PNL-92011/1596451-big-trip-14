import MenuView from '../view/trip-menu.js';
import SortView from '../view/trip-sorting.js';
import FilterView from '../view/trip-filters.js';
import PointsListView from '../view/trip-point-list.js';
import TripInfoView from '../view/trip-info.js';
import NewPointView from '../view/trip-point-new.js';
import { render } from '../util/render.js';
import { sortDay, sortTime, sortPrice } from '../util/sort-functions.js';
import { updateItem } from '../util/handle-functions.js';
import { RenderPosition, SortType } from '../util/common.js';
import PointPresenter from '../presenter/point.js';


export default class Trip {
  constructor(tripContainer, tripInfoContainer, tripFilterContainer, tripMenuContainer) {
    this._tripContainer = tripContainer;
    this._tripInfoContainer = tripInfoContainer;
    this._tripFilterContainer = tripFilterContainer;
    this._tripMenuContainer = tripMenuContainer;
    this._currentSortType = SortType.DEFAULT;

    this._pointsListComponent = new PointsListView();
    this._menuComponent = new MenuView();
    this._filterComponent = new FilterView();
    this._sortComponent = new SortView();
    this._newPointComponent = new NewPointView();
    this._tripInfoComponent = new TripInfoView();

    this._pointPresenter = {};

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPointsData) {
    this._tripPointsData = tripPointsData;
    this._sourcedPoints = tripPointsData.slice();   /** сохранение исходного порядка ТМ */

    this._renderTrip();
    this._renderList();
  }


  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.DEFAULT:
        this._tripPointsData.sort(sortDay);
        break;
      case SortType.TIME:
        this._tripPointsData.sort(sortTime);
        break;
      case SortType.PRICE:
        this._tripPointsData.sort(sortPrice);
        break;
      default:
        this._tripPointsData = this._sourcedPoints.slice();
    }

    this._currentSortType = SortType;
  }


  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._tripPointsData.forEach((point) => this._renderPoint(point));
  }

  _clearPoints() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
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


  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((pointPresenter) => pointPresenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPointsData = updateItem(this._tripPointsData, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleSortTypeChange(sortType) {
    /** проверка текущего типа сортировки */
    if (this._currentSortType === sortType) {
      return;
    }

    /** сортировка ТМ */
    this._sortPoints(sortType);

    /** очистка ТМ */
    this._clearPoints();

    /** рендерим ТМ заново */
    this._renderPoints();
  }
}


