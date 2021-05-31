import AbstractView from './abstract.js';
import { FilterType } from '../util/common.js';

const createFilters = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
    ${type === currentFilterType ? 'checked' : ''}
    ${count === 0 ? 'disabled' : ''}
    value="${name}" >
    <label class="trip-filters__filter-label" for="filter-${name}">${name} ${count}</label>
  </div>`;
};

const createFiltersTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilters(filter, currentFilterType)).join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};


export default class Filter extends AbstractView {
  constructor(filters, currentFilterType = FilterType.EVERYTHING) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._handleFilterTypeChange);
  }

  _handleFilterTypeChange(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}


