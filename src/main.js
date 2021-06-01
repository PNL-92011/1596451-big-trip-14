//import { createMockPoints } from './mock/point.js';
import { UpdateType } from './util/common.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import Api from './api.js';


//const TRIP_POINTS = 2;
//export const tripPointsData = createMockPoints(TRIP_POINTS);

const AUTHORIZATION = 'Basic polo944apolo8546wf';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);

const siteMainHeader = document.querySelector('.trip-main');
const siteMenu = siteMainHeader.querySelector('.trip-controls');
const siteFilter = siteMainHeader.querySelector('.trip-controls__filters');
const siteEvents = document.querySelector('.trip-events');

const pointsModel = new PointsModel();  //pointsModel.setPoints(tripPointsData);  /** пока не подключен сервер - записываем моковые данные */
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(siteFilter, filterModel, pointsModel);
filterPresenter.init();

const tripPresenter = new TripPresenter(siteEvents, siteMainHeader, siteMenu, siteFilter, pointsModel, filterModel, api);
tripPresenter.init();


api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);

    document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      tripPresenter._createNewEvent();
    });
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });


// Promise.all([
//   api.getPoints(),
// ])
//   .then((points) => {
//     pointsModel.setPoints(UpdateType.INIT, points);
//   })
//   .catch(() => {
//     pointsModel.setPoints(UpdateType.INIT, []);
//   });

