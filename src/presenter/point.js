import EditFormView from '../view/trip-point-edit.js';
import PointView from '../view/trip-point.js';
import { render, replace, remove } from '../util/render.js';
import { RenderPosition, Mode, UserAction, UpdateType } from '../util/common.js';

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
};

export default class Point {
  constructor(pointListContainer, changeData, changeMode) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleCloseEdit = this._handleCloseEdit.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new EditFormView(point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);           /** открытие стрелка */
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);   /** Favorite */
    this._pointEditComponent.setClickSaveHandler(this._handleFormSubmit);      /** закрытие Save */
    this._pointEditComponent.setClickCloseHandler(this._handleFormSubmit);     /** закрытие стрелка */
    this._pointEditComponent.setClickCloseHandler(this._handleCloseEdit);      /** закрытие стрелка */
    this._pointEditComponent.setClickDeleteHandler(this._handleDeleteClick);   /** Delete */


    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      /** replace(this._pointEditComponent, prevPointEditComponent); */
      replace(this._pointComponent, prevPointEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditFormToPoint();
    }
  }

  setViewState(state) {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this._pointComponent.shake(resetFormState);
        this._pointEditComponent.shake(resetFormState);
        break;
    }
  }

  _replacePointToEditForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceEditFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._pointEditComponent.reset(this._point);
      this._replaceEditFormToPoint();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      /** UpdateType.PATCH, */
      UpdateType.MINOR,
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }

  _handleEditClick() {
    this._replacePointToEditForm();
  }

  _handleCloseEdit() {
    this._pointEditComponent.reset(this._point);
    this._replaceEditFormToPoint();
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
    this._replaceEditFormToPoint();
  }

  _handleDeleteClick(point) {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MAJOR,
      point,
    );
  }

}
