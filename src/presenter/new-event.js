import EditFormView from '../view/trip-point-edit.js';
import { render, remove } from '../util/render.js';
import { RenderPosition, UserAction, UpdateType } from '../util/common.js';


const BLANK_POINT_NEW = {
  type: 'flight',
  destination: {
    description: [],
    city: [],
    photos: [],
  },
  dateFrom: null,
  dateTill: null,
  offers: [],
  price: '',
  isFavorite: false,
};


export default class NewEvent {
  constructor(pointsListComponent, changeData) {
    this._pointsListComponent = pointsListComponent;
    this._changeData = changeData;

    this._newEventComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init() {
    if (this._newEventComponent !== null) {
      return;
    }
    this._newEventComponent = new EditFormView(BLANK_POINT_NEW);
    this._newEventComponent.setClickSaveHandler(this._handleFormSubmit);
    this._newEventComponent.setClickDeleteHandler(this._handleDeleteClick);

    render(this._pointsListComponent, this._newEventComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
    document.querySelector('.trip-main__event-add-btn').disabled = true;
  }

  destroy() {
    if (this._newEventComponent === null) {
      return;
    }
    remove(this._newEventComponent);
    this._newEventComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
    document.querySelector('.trip-main__event-add-btn').disabled = false;
  }

  setSaving() {
    this._newEventComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._newEventComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._newEventComponent.shake(resetFormState);
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceEditFormToPoint();
    }
  }
}
