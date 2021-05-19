import Abstract from './abstract.js';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._pointData = {};
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }


  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }


  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._pointData = Object.assign(
      {},
      this._pointData,
      update,
    );

    if(justDataUpdating) {
      return;
    }

    this.updateElement();
  }
}
