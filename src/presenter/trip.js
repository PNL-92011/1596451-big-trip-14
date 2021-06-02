import MenuView from '../view/trip-menu.js';
import SortView from '../view/trip-sorting.js';
import FilterView from '../view/trip-filters.js';
import PointsListView from '../view/trip-point-list.js';
import TripInfoView from '../view/trip-info.js';
import NewEventView from '../view/trip-point-new.js';
import LoadingView from '../view/loading.js';

import { render, remove } from '../util/render.js';
import { sortDay, sortTime, sortPrice, filter } from '../util/sort-functions.js';

import { RenderPosition, SortType, UserAction, UpdateType, FilterType } from '../util/common.js';

import PointPresenter, {State as PointPresenterViewState} from './point.js';
import NewEventPresenter from './new-event.js';



export default class Trip {
  constructor(tripContainer, tripInfoContainer, tripFilterContainer, tripMenuContainer, pointsModel, filterModel, api) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._tripInfoContainer = tripInfoContainer;
    this._tripFilterContainer = tripFilterContainer;
    this._tripMenuContainer = tripMenuContainer;
    this._isLoading = true;
    this._api = api;         // ошибка: плохой запрос!

    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._sortComponent = null;
    this._menuComponent = new MenuView();
    this._filterComponent = new FilterView();

    this._newEventComponent = new NewEventView();
    this._tripInfoComponent = new TripInfoView(this._getPoints());
    this._pointsListComponent = new PointsListView();
    this._loadingComponent = new LoadingView();


    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._newEventPresenter = new NewEventPresenter(this._pointsListComponent, this._handleViewAction);
  }



  init() {
    this._renderTrip();

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
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

  _renderLoading() {
    render(this._tripContainer, this._loadingComponent, RenderPosition.BEFOREEND);
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
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType === SortType.DAY;
    }
  }

  _renderMessage() {
    render(this._tripContainer, this._newEventComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (!this._getPoints().length) {
      this._renderMessage();
      return;
    }
    //this._tripInfoComponent.init(this._points());
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

  /** Презентер сообщает Моделе, что нужно сделать */
  /** actionType - действие пользователя (изменение, добавление, удаление данных) */
  /** updateType - тип изменений (для корректного (частичного или полного) обновления) */
  /** update - обновленные данные */

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        //this._pointsModel.updatePoint(updateType, update);
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.SAVING);

        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;

      case UserAction.ADD_POINT:
        //this._pointsModel.addPoint(updateType, update);
        this._api.addPoint(update)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
          })
          .catch(() => {
            this._newEventPresenter.setAborting();
          });
        break;

      case UserAction.DELETE_POINT:
        //this._pointsModel.deletePoint(updateType, update);
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.DELETING);

        this._api.deletePoint(update)
          .then(() => {
            this._pointsModel.deletePoint(updateType, update);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;
    }
  }

  /** отдаем модели */
  _handleModelEvent(updateType, point) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[point.id].init(point);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderSort();
        this._renderList();
        this._clearTripInfo();
        this._renderTripInfo();
        //this._tripInfoComponent.init(this._getPoints());
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }


  _handleSortTypeChange(sortType) {
    /** проверка текущего типа сортировки */
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }
}


