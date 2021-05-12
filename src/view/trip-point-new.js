import AbstractView from './abstract.js';


const createNewPoint = () => {
  return `
  <p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class NewPoint extends AbstractView {
  getTemplate() {
    return createNewPoint();
  }
}
