import MenuView from '../view/trip-menu.js';
import SortView from '../view/trip-sorting.js';
import FilterView from '../view/trip-filters.js';
import PointsListView from '../view/trip-point-list.js';
import TripInfoView from '../view/trip-info.js';
import NewEventView from '../view/trip-point-new.js';

import { render, remove } from '../util/render.js';
import { sortDay, sortTime, sortPrice, filter } from '../util/sort-functions.js';
import { RenderPosition, SortType, UserAction, UpdateType, FilterType } from '../util/common.js';

import PointPresenter from './point.js';
import NewEventPresenter from './new-event.js';
//import FilterPresenter from './filter.js';  // вернула filterPresenter в main


export default class Trip {
  constructor(tripContainer, tripInfoContainer, tripFilterContainer, tripMenuContainer, pointsModel, filterModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._tripInfoContainer = tripInfoContainer;
    this._tripFilterContainer = tripFilterContainer;
    this._tripMenuContainer = tripMenuContainer;

    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._sortComponent = null;
    this._menuComponent = new MenuView();
    this._filterComponent = new FilterView();
    this._newEventComponent = new NewEventView();
    this._tripInfoComponent = new TripInfoView(this._getPoints());
    this._pointsListComponent = new PointsListView();

    //this._filterPresenter = new FilterPresenter(this._tripMenuContainer, this._pointsModel = pointsModel, this._filterModel = filterModel);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._newEventPresenter = new NewEventPresenter(this._pointsListComponent, this._handleViewAction);
  }


  init() {
    this._renderTrip();
    //this._filterPresenter.init();  // вернула filterPresenter в main
  }

  _createNewEvent() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._newEventPresenter.init();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortDay);
      case SortType.TIME:
        return filteredPoints.sort(sortTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPrice);
    }
    return filteredPoints;
  }


  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    /** при перерисовке нужно брать новые данные */
    this._tripInfoComponent.init(this._getPoints());
    render(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _clearTripInfo() {
    remove(this._tripInfoComponent);
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

  _renderPoints() {
    const points = this._getPoints();
    points.forEach((point) => this._renderPoint(point));
  }

  _clearPoints() {
    this._newEventPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _clearTrip({resetSortType = false} = {}) {
    this._clearPoints();
    remove(this._sortComponent);
    remove(this._tripInfoComponent);
    remove(this._newEventComponent);

    if (resetSortType) {
      this._currentSortType === SortType.DAY;
    }
  }

  _renderMessage() {
    render(this._tripContainer, this._newEventComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (!this._getPoints().length) {
      this._renderMessage();
      return;
    }
    this._renderTripInfo();
    this._renderMenu();
    this._renderSort();
    this._renderList();
  }


  _handleModeChange() {
    this._newEventPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((pointPresenter) => pointPresenter.resetView());
  }

  // actionType - действие пользователя (изменение, добавление, удаление данных)
  // updateType - тип изменений (для корректного (частичного или полного) обновления)
  // update - обновленные данные
  /** Презентер сообщает Моделе, что нужно сделать */
  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update); // Модель обновит ТМ и сообщит об этом Презентеру
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);    //  Модель добавит ТМ и сообщит об этом Презентеру
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);  // Модель удалит ТМ и сообщит об этом Презентеру
        break;
    }
  }

  /** отдаем модели */
  _handleModelEvent(updateType, point) {
    switch (updateType) {
      case UpdateType.PATCH:   // - обновление ТМ (например, пометить избранным)
        this._pointPresenter[point.id].init(point); //this._renderPoint(data);  // ОШИБКА !!!
        break;
      case UpdateType.MINOR:   // - обновление списка ТМ (при изменении данных внутри ТМ)
        this._clearTrip();
        this._renderSort();
        this._renderList();
        this._clearTripInfo();  // очистка TripInfo перед перерисовкой
        this._renderTripInfo();
        break;
      case UpdateType.MAJOR:    // - обновление всего Trip (например, при переключении фильтра)
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        // добавить фильтрацию
        break;
    }
  }


  _handleSortTypeChange(sortType) {
    /** проверка текущего типа сортировки */
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;   /** сортировка ТМ */          ////this._sortPoints(sortType);
    this._clearTrip();                  /** очистка ТМ */             ////this._clearPoints();
    //this._renderPoints();             /** отрисовка ТМ заново */
    this._renderTrip();
  }
}


