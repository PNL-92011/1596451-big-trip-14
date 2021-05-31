import { createMockPoints } from './mock/point.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';

const TRIP_POINTS = 2;
export const tripPointsData = createMockPoints(TRIP_POINTS);

const pointsModel = new PointsModel();
pointsModel.setPoints(tripPointsData);  /** пока не подключен сервер - записываем моковые данные */

const filterModel = new FilterModel();

const siteMainHeader = document.querySelector('.trip-main');
const siteMenu = siteMainHeader.querySelector('.trip-controls');
const siteFilter = siteMainHeader.querySelector('.trip-controls__filters');
const siteEvents = document.querySelector('.trip-events');


const tripPresenter = new TripPresenter(siteEvents, siteMainHeader, siteMenu, siteFilter, pointsModel, filterModel);

tripPresenter.init();


