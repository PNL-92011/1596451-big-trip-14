import dayjs from 'dayjs';
import { TYPES, OFFERS } from '../util/point.js';
import { formatDateSlashTime } from '../util/date-format';
import AbstractView from './abstract.js';

const BLANK_POINT = {
  type: 'flight',
  destination: '',
  dateFrom: dayjs().format('DD/MM/YY 00:00'),
  dateTill: dayjs().format('DD/MM/YY 00:00'),
  price: '',
  id: '',
  photos: '',
};


const editPointForm = (pointData) => {
  const {type, destination, dateFrom, dateTill, price, id, photos} = pointData;

  const checkboxTypes = TYPES.map((type) => {
    return `
      <div class="event__type-item">
        <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-taxi-${id}">${type}</label>
      </div>`;
  }).join('');


  const checkboxOffers = OFFERS.map((offer) => {
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.nickname}-${id}" type="checkbox" name="event-offer-${offer.nickname}">
      <label class="event__offer-label" for="event-offer-${offer.nickname}-${id}">
        <span class="event__offer-title">${offer.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }).join('\n');


  const photosTemplate = photos.map((photo) => {
    return `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;
  }).join('');


  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">


        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${checkboxTypes}
          </fieldset>
        </div>
      </div>


      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.city}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>


      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateSlashTime(dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateSlashTime(dateTill)}">
      </div>


      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
      <button class="event__reset-btn visually-hidden" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>

    <section class="event__details">

      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${checkboxOffers}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${photosTemplate}
          </div>
        </div>
      </section>

    </section>
  </form>
</li>`;
};


export default class EditForm extends AbstractView {
  constructor(point = BLANK_POINT) {
    super();
    this._point = point;
    //this._element = null;

    // renaming
    // this._formHandler = this._formHandler.bind(this);
    // this._editClickHandler = this._editClickHandler.bind(this);
    // this._clickCancelHandler = this._clickCancelHandler.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
  }

  getTemplate() {
    return editPointForm(this._point);
  }

  // обработчик на Save
  _handleFormSubmit(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._point);
  }

  setFormHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._handleFormSubmit);
  }


  // обработчик на стрелку закрытия формы
  _handleEditClick(evt) {
    evt.preventDefault();
    this._callback.editClick(this._point);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._handleEditClick);
  }


  // обработчик на Cancel/Delete
  _handleCancelClick(evt) {
    evt.preventDefault();
    this._callback.clickCancel();
  }

  setClickCancelHandler(callback) {
    this._callback.clickCancel = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._handleCancelClick);
  }
}
