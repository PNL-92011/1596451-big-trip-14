import Observer from './observer.js';

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
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

    this._points = [                        // перезаписывает массив ТМ
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, this._points); // здесь Модель сообщает Презентеру, что данные обновлены и их можно забрать =>
  }                                         // =>  будет вызываться _handleModelEvent


  /** добавление ТМ */
  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, this._points);
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
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'base_price': point.price,
        'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
        'date_to': point.dateTill instanceof Date ? point.dateTo.toISOString() : null,
        'is_favorite': point.isFavorite,
        'destination':
        {
          'name': point.destination.city,
          'picture': point.destination.photos,
          'description': point.destination.description,
        },
      },
    );

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTill;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.destination.city;
    delete adaptedPoint.destination.photos;

    return adaptedPoint;
  }

}
