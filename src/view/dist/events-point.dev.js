"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTripEventsPoint = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createTripEventsPoint = function createTripEventsPoint(createMockPoints) {
  var type = createMockPoints.type,
      trip_info = createMockPoints.trip_info,
      date_from = createMockPoints.date_from,
      date_till = createMockPoints.date_till,
      offers = createMockPoints.offers,
      cost = createMockPoints.cost,
      isFavorite = createMockPoints.isFavorite;
  var timeStart = (0, _dayjs["default"])(date_from).format('YYYY-MM-DDTHH:mm');
  var timeEnd = (0, _dayjs["default"])(date_till).format('YYYY-MM-DDTHH:mm');
  var duration = timeStart.diff(timeEnd, 'minute');
  var createOffers = offers.map(function (offer) {
    return "<li class=\"event__offer\">\n    <span class=\"event__offer-title\">".concat(offer.name, "</span>\n    &plus;&euro;&nbsp;\n    <span class=\"event__offer-price\">").concat(offer.price, "</span>\n  </li>");
  });
  return "<li class=\"trip-events__item\">\n  <div class=\"event\">\n    <time class=\"event__date\" datetime=\"".concat((0, _dayjs["default"])(date_from).format('YYYY-MM-DD'), "\">").concat((0, _dayjs["default"])(date_from).format('MMM-DD'), "</time>\n\n    <div class=\"event__type\">\n      <img class=\"event__type-icon\" width=\"42\" height=\"42\" src=\"img/icons/").concat(type, ".png\" alt=\"Event type icon\">\n    </div>\n\n\n    <h3 class=\"event__title\">").concat(type, " ").concat(trip_info.name, "</h3>\n    <div class=\"event__schedule\">\n      <p class=\"event__time\">\n        <time class=\"event__start-time\" datetime=\"").concat((0, _dayjs["default"])(date_from).format('YYYY-MM-DDTHH:mm'), "\">").concat((0, _dayjs["default"])(date_from).format('HH:mm'), "</time>\n        &mdash;\n        <time class=\"event__end-time\" datetime=\"").concat((0, _dayjs["default"])(date_till).format('YYYY-MM-DDTHH:mm'), "\">").concat((0, _dayjs["default"])(date_till).format('HH:mm'), "</time>\n      </p>\n      <p class=\"event__duration\">").concat(duration, "M</p>\n    </div>\n\n\n    <p class=\"event__price\">\n      &euro;&nbsp;<span class=\"event__price-value\">").concat(cost, "</span>\n    </p>\n\n\n    <h4 class=\"visually-hidden\">Offers:</h4>\n    <ul class=\"event__selected-offers\">\n     ").concat(createOffers, "\n    </ul>\n\n\n    <button class=\"event__favorite-btn ").concat(isFavorite ? 'event__favorite-btn--active' : '', "\" type=\"button\">\n      <span class=\"visually-hidden\">Add to favorite</span>\n      <svg class=\"event__favorite-icon\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n        <path d=\"M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z\"/>\n      </svg>\n    </button>\n\n\n    <button class=\"event__rollup-btn\" type=\"button\">\n      <span class=\"visually-hidden\">Open event</span>\n    </button>\n\n  </div>\n</li>");
};

exports.createTripEventsPoint = createTripEventsPoint;