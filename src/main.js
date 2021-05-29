import { createMockPoints } from './mock/point.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/point-model.js';

const TRIP_POINTS = 3;
export const tripPointsData = createMockPoints(TRIP_POINTS);

const pointsModel = new PointsModel();
pointsModel.setPoints(tripPointsData);  /** пока не подключен сервер - записываем моковые данные */

const siteMainHeader = document.querySelector('.trip-main');
const siteMenu = siteMainHeader.querySelector('.trip-controls');
const siteFilter = siteMainHeader.querySelector('.trip-controls__filters');
const siteEvents = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(siteEvents,  siteMainHeader,  siteMenu,   siteFilter, pointsModel);

tripPresenter.init();

// export const createMockPoints = (count) => {
//   return new Array(count).fill(null).map(generatePoint);
// };
