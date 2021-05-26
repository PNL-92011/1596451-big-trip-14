import { createMockPoints } from './mock/point.js';
import TripPresenter from './presenter/trip.js';

const TRIP_POINTS = 3;
export const tripPointsData = createMockPoints(TRIP_POINTS);

const siteMainHeader = document.querySelector('.trip-main');
const siteMenu = siteMainHeader.querySelector('.trip-controls');
const siteFilter = siteMainHeader.querySelector('.trip-controls__filters');
const siteEvents = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(siteEvents,  siteMainHeader,  siteMenu,   siteFilter);
tripPresenter.init(tripPointsData);


