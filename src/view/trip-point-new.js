import {createDomElement} from '../util/common.js';


const createNewPoint = () => {
  return `
  <p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class NewPoint {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNewPoint();
  }

  getElement() {
    if (!this._element) {
      this._element = createDomElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
