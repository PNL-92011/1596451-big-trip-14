import Observer from './observer.js';

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }


  /** обновлние ТМ */
  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [                        /** перезаписывает массив ТМ */
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);       /** здесь Модель сообщает Презентеру, что данные обновлены и их можно забрать => */
  }                                         /** =>  будет вызываться _handleModelEvent */


  /** добавление ТМ */
  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, update);
  }


  /** удаление ТМ */
  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        price: point.base_price,
        dateFrom: point.date_from !== null ? new Date(point.date_from) : point.date_from,
        dateTill: point.date_to !== null ? new Date(point.date_to) : point.date_to,
        isFavorite: point.is_favorite,
        destination:
        {
          city: point.destination.name,
          photos: point.destination.pictures,
          description: point.destination.description,
        },
      },
    );

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.destination.name;
    delete adaptedPoint.destination.pictures;

    return adaptedPoint;
  }


  static adaptToServer(point) {
    return {
      'base_price': point.price,
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
      'date_to': point.dateTill instanceof Date ? point.dateTill.toISOString() : null,
      'is_favorite': point.isFavorite,
      'destination':
      {
        'name': point.destination.city,
        'pictures': point.destination.photos,
        'description': point.destination.description,
      },
      'offers': point.offers,
      'type': point.type,
    };
  }

}
