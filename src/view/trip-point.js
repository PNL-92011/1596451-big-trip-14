import { formatDateOnly, formatTimeOnly, formatShortDate, formatFullDate, calculateDuration } from '../util.js';

export const createTripPoints = (createMockPoints) => {
  const {type, city, dateFrom, dateTill, offers, price, isFavorite} = createMockPoints;

  const createOffers = offers.map((offer) => {
    return `<li class="event__offer">
    <span class="event__offer-title">${offer.name}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>`;
  }).join('\n');


  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${formatDateOnly(dateFrom)}">${formatShortDate(dateFrom)}</time>

    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>


    <h3 class="event__title">${type} ${city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${formatFullDate(dateFrom)}">${formatTimeOnly(dateFrom)}</time>
        &mdash;
        <time class="event__end-time" datetime="${formatFullDate(dateTill)}">${formatTimeOnly(dateTill)}</time>
      </p>
      <p class="event__duration">${calculateDuration(dateFrom, dateTill)}</p>
    </div>


    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>


    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
     ${createOffers}
    </ul>


    <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>


    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>

  </div>
</li>`;
};


// /**
//  * calculateDuration = (start, end)
//  * Функция считает разницу дат (времени)
//  * @param {date} start - начало промежутка
//  * @param {date} end - конец промежутка
//  * @returns {string} - возвращает промежуток в формате ${hours}H ${minutes}M
//  * до 60 мин - возвращает ${minutes}M
//  * // Math.round() возвращает число, округлённое к ближайшему целому.
//  * // Math.floor() - округление вниз до ближайшего меньшего целого.
//  * // % - возвращает целочисленный остаток от деления двух операндов.
//  */
