import {createDomElement} from '../util/common.js';

const createPointsList = () => '<ul class="trip-events__list"></ul>';

export default class PointsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createPointsList();
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
