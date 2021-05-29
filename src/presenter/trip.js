import MenuView from '../view/trip-menu.js';
import SortView from '../view/trip-sorting.js';
import FilterView from '../view/trip-filters.js';
import PointsListView from '../view/trip-point-list.js';
import TripInfoView from '../view/trip-info.js';
import NewPointView from '../view/trip-point-new.js';
import { render } from '../util/render.js';
import { sortDay, sortTime, sortPrice } from '../util/sort-functions.js';
import { RenderPosition, SortType, UserAction, UpdateType } from '../util/common.js';
import PointPresenter from '../presenter/point.js';


export default class Trip {
  constructor(tripContainer, tripInfoContainer, tripFilterContainer, tripMenuContainer, pointsModal) {
    this._pointsModal = pointsModal;
    this._tripContainer = tripContainer;
    this._tripInfoContainer = tripInfoContainer;
    this._tripFilterContainer = tripFilterContainer;
    this._tripMenuContainer = tripMenuContainer;
    this._currentSortType = SortType.DAY;

    this._pointsListComponent = new PointsListView();
    this._menuComponent = new MenuView();
    this._filterComponent = new FilterView();
    this._sortComponent = new SortView();
    this._newPointComponent = new NewPointView();
    this._tripInfoComponent = new TripInfoView();

    this._pointPresenter = {};

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  //// init(tripPointsData) {
  //// this._tripPointsData = tripPointsData;
  //// this._sourcedPoints = tripPointsData.slice();   /** сохранение исходного порядка ТМ */
  init() {
    this._renderTrip();
    this._renderList();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.DAY:
        return this._pointsModel.getPoints().slice().sort(sortDay);
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortTime);
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortPrice);
    }
    return this._pointsModel.getPoints();
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
    const points = this._getPoints();
    render(this._tripContainer, this._pointsListComponent, RenderPosition.BEFOREEND);
    this._renderPoints(points);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    ////this._tripPointsData.forEach((point) => this._renderPoint(point));
    points.forEach((point) => this._renderPoint(point));
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
    if (!this._getPoints().length) {
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

  //// /** вызов обновления модели */
  //// _handlePointChange(updatedPoint) {
  ////   this._tripPointsData = updateItem(this._tripPointsData, updatedPoint);
  ////   this._pointPresenter[updatedPoint.id].init(updatedPoint);
  //// }


  //// _handlePointChange(updatedPoint) {
  ////   this._pointPresenter[updatedPoint.id].init(updatedPoint);
  //// }

  //// /** вызов обновления модели = обработка действий на представлении */
  ////  отдаем вьюшкам
  _handleViewAction(actionType, updateType, update) {
    //console.log(actionType, updateType, update);
    // actionType - действие пользователя (изменение, добавление, удаление данных)
    // updateType - тип изменений (для корректного (частичного или полного) обновления)
    // update - обновленные данные

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  //// отдаем модели
  _handleModelEvent(updateType, data) {
    //console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)

    switch (updateType) {
      case UpdateType.PATCH:
        // - обновление ТМ (например, когда поменялась цена или дата)
        //// Можно ли вместо this._pointPresenter[data.id].init(data); (из демо) применить renderPoint(data) ???
        ////  УТОЧНИТЬ
        this._renderPoint(data);
        break;
      case UpdateType.MINOR:
        // - обновление списка ТМ (например, когда ТМ занесли в избранное)
        this._renderList();
        break;
      case UpdateType.MAJOR:
        // - обновление всего Trip (например, при переключении фильтра)
        this._renderTrip();
        this._renderList();
        break;
    }
  }


  _handleSortTypeChange(sortType) {
    /** проверка текущего типа сортировки */
    if (this._currentSortType === sortType) {
      return;
    }

    /** сортировка ТМ */
    ////this._sortPoints(sortType);
    this._currentSortType = sortType;

    /** очистка ТМ */
    this._clearPoints();

    /** рендерим ТМ заново */
    this._renderPoints();
  }
}


