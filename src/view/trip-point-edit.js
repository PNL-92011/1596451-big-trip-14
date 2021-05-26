import { TYPES, GROUP_OFFERS } from '../util/point.js';
import { formatDateSlashTime } from '../util/date-format';
import { getArrayByType } from '../util/handle-functions.js';
import SmartView from './smart.js';
import { DestinationArray } from '../mock/point.js';
//import { getShuffled } from '../mock/utils.js';
//import { CITIES, DESCRIPTIONS, generatePhotos } from '../mock/point.js';
//import { getRandomInteger } from '../mock/utils.js';


const BLANK_POINT = {
  type: 'flight',
  destination: {
    description: '',
    city: '',
    photos: {
      src: '',
      description: '',
    },
  },
  dateFrom: null,
  dateTill: null,
  offers: [],
  price: '',
  isFavorite: false,
  id: '',

};


const editPointForm = (data) => {
  const {type, destination, dateFrom, dateTill, offers, price, id, isPictures, isDescription} = data;


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

  const destinationTemplate = () => {

    const photoTemplate = () => {
      if (isPictures) {
        const images = destination.photos.map((photo) => {
          return `
          <img class="event__photo" src="${photo.src}" alt="${photo.description}">`;
        }).join('\n');

        return `
        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${images}
          </div>
        </div>`;
      }

      return '';
    };

    const descriptionTemplate = () => {
      if (isDescription) {
        return `<p class="event__destination-description">${destination.description}</p>`;
      }

      return '';
    };

    if (isPictures || isDescription) {
      return `
      <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${descriptionTemplate()}
      ${photoTemplate()}
    </section>`;
    }

    return '';
  };


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
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.city}" list="destination-list-${id}">
        <datalist id="destination-list-${id}">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>


      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${formatDateSlashTime(dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${formatDateSlashTime(dateTill)}">
      </div>


      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
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

      ${destinationTemplate()}

    </section>
  </form>
</li>`;
};


// export default class EditForm extends AbstractView {
export default class EditForm extends SmartView {
  constructor(point = BLANK_POINT) {
    super();
    //this._point = point;
    this._data = EditForm.parsePointToData(point);

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);

    this._handleTypeChange = this._handleTypeChange.bind(this);
    this._handleCityChange = this._handleCityChange.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return editPointForm(this._data);
  }

  /** обработчик на Save */
  _handleSaveClick(evt) {
    evt.preventDefault();
    this._callback.saveClick(EditForm.parsePointToData(this._data));
  }

  setClickSaveHandler(callback) {
    this._callback.saveClick = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._handleSaveClick);
  }


  /** обработчик на стрелку закрытия формы */
  _handleEditClick(evt) {
    evt.preventDefault();
    this._callback.editClick();
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

  /** обработчик на смену типа события */
  _handleTypeChange(evt) {
    this.updateData({
      type: evt.target.value,
      offers: [],
    });
  }

  /** обработчик на смену города */
  // _handleCityChange(evt) {
  //   if(!CITIES.includes(evt.target.value)) {
  //     evt.target.value = '';
  //     return;
  //   }

  //   this.updateData({
  //     destination: {
  //       city: evt.target.value,
  //       description: getRandomInteger(0, DESCRIPTIONS.length - 1),
  //       photos: generatePhotos(),
  //     },
  //   });
  // }

  /** обработчик на смену города */
  _handleCityChange(evt) {
    this.updateData({
      destination: {
        city: evt.target.value,
        description: DestinationArray[DestinationArray.findIndex((item) => item.city === evt.target.value)].description,
        photos: DestinationArray[DestinationArray.findIndex((item) => item.city === evt.target.value)].photos,
      },
      isPictures: DestinationArray[DestinationArray.findIndex((item) => item.city === evt.target.value)].photos.length !== 0,
      isDescription: DestinationArray[DestinationArray.findIndex((item) => item.city === evt.target.value)].description.length !== 0,
    });
  }


  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._handleTypeChange);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._handleCityChange);

  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setClickSaveHandler(this._callback.saveClick);
    this.setClickCloseHandler(this._callback.editClick);
  }


  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        isPictures: point.destination.photos.length !==0,
        isDescription: point.destination.description.length !==0,
      },
    );
  }


  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    if (!data.isPictures) {
      data.destination.photos = '';
    }

    if (!data.isDescription) {
      data.destination.description = '';
    }

    delete data.isPictures;
    delete data.isDescription;

    return data;
  }
}
