import dayjs from 'dayjs';
import { TYPES, GROUP_OFFERS } from '../util/point.js';
import { formatDateSlashTime } from '../util/date-format';
import { getArrayByType } from '../util/render';
//import AbstractView from './abstract.js';
import SmartView from './smart.js';
import { getShuffled } from '../mock/utils.js';
import { DESCRIPTIONS, generatePhotos } from '../mock/point.js';


const BLANK_POINT = {
  type: 'flight',
  city: '',
  dateFrom: dayjs().format('DD/MM/YY 00:00'),
  dateTill: dayjs().format('DD/MM/YY 00:00'),
  price: '',
  id: '',
  description: '',
  photos: '',
  offers: [],
  isFavorite: false,
};


const editPointForm = (pointData) => {
  const {type, city, dateFrom, dateTill, price, id, description, photos, offers} = pointData;

  const typeTemplate = TYPES.map((type) => {
    return `
      <div class="event__type-item">
        <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-taxi-${id}">${type}</label>
      </div>`;
  }).join('');


  const checkboxOffers = (offer) => {
    let checked = '';

    if (offers.some((element) => element.name === offer.name)) {
      checked  = 'checked';
    }
    // уточнить про checked

    return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.nickname}-${id}" type="checkbox" name="event-offer-${offer.nickname}"${checked}>
    <label class="event__offer-label" for="event-offer-${offer.nickname}-${id}">
      <span class="event__offer-title">${offer.name}</span>
       &plus;&euro;&nbsp;
       <span class="event__offer-price">${offer.price}</span>
     </label>
   </div>`;
  };

  const offersByType = getArrayByType(GROUP_OFFERS, type);
  const offerTemplate = offersByType.map((offer) => checkboxOffers(offer)).join('\n');


  const photoTemplate = photos.map((photo) => {
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
            ${typeTemplate}
          </fieldset>
        </div>
      </div>


      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
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
          ${offerTemplate}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${photoTemplate}
          </div>
        </div>
      </section>

    </section>
  </form>
</li>`;
};


// export default class EditForm extends AbstractView {
export default class EditForm extends SmartView { ///
  constructor(point = BLANK_POINT) {
    super();
    this._point = point;
    // this._pointData = EditForm.parsePointToData(point); ///

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);

    this._handleTypeChange = this._handleTypeChange.bind(this); //
    this._handleCityChange = this._handleCityChange.bind(this); ///

    this._setInnerHandlers();
  }

  getTemplate() {
    return editPointForm(this._point);
  }

  /** обработчик на Save */
  _handleFormSubmit(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._point);
  }

  setClickSaveHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._handleFormSubmit);
  }


  /** обработчик на стрелку закрытия формы */
  _handleEditClick(evt) {
    evt.preventDefault();
    this._callback.editClick(this._point);
  }

  setClickCloseHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._handleEditClick);
  }


  /** обработчик на Cancel/Delete */
  _handleCancelClick(evt) {
    evt.preventDefault();
    this._callback.clickCancel();
  }

  setClickCancelHandler(callback) {
    this._callback.clickCancel = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._handleCancelClick);
  }

  //
  _handleTypeChange(evt) {
    this.updateData({
      type: evt.target.value,
    });
  }

  /// уточнить !!!
  ///
  _handleCityChange(evt) {
    this._updateDate({
      city: evt.target.value,
      description: getShuffled(DESCRIPTIONS).slice(0, 5).join(' '),
      photos: generatePhotos(),
    });
  }

  //
  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._handleTypeChange);
    this.getElement().querySelector('#event-destination-1').addEventListener('change', this._handleCityChange); /// '#event-destination' - ???

  }

  //
  restoreHandlers() {
    this._setInnerHandlers();
    this.setClickSaveHandler(this._callback.formSubmit);
    this.setClickCloseHandler(this._callback.editClick);
  }

  // //
  // static parsePointToData(point) {
  //   return Object.assign(
  //     {},
  //     point,
  //     {
  //       // ??

  //     },
  //   );
  // }

  // //
  // static parseDataToPoint(pointData) {
  //   pointData = Object.assign({}, pointData);

  //   return pointData;
  // }

}
