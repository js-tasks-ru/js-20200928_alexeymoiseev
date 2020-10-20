export default class SortableTable {
  subElements = {};

  constructor(header = [], { data = []} = {}) {
    this.header = header;
    this.data = data;

    this.render();
  }

  render() {
    const table = document.createElement('div');

    table.innerHTML =
      `<div class="sortable-table">
         <div data-elem="header" class="sortable-table__header sortable-table__row">
            ${this._getHeaderColumns()}
         </div>
         <div data-element="body" class="sortable-table__body">
            ${this._getRows()}
         </div>
       </div>`;

    this.element = table.firstElementChild;
    this.subElements = this._getSubElements(this.element);
  }

  destroy() {
    if (this.element) {
      this.remove();
      this.element = null;
    }
  }

  remove() {
    this.element.remove();
  }

  sort(field, direction) {
    this.data.sort(this._getCompareFn(direction, field));

    const sortColumn = this.element.querySelector(`[data-name=${field}]`);
    sortColumn.dataset.order = direction;

    this._deleteSortArrow(document);
    this._setSortArrow(sortColumn);

    this.subElements.body.innerHTML = this._getRows();
    this.subElements = this._getSubElements(this.element);
  }

  _deleteSortArrow(document) {
    document.querySelectorAll(`[class="sortable-table__sort-arrow"]`)
      .forEach(elem => elem.remove());
  }

  _setSortArrow(sortColumn) {
    sortColumn.insertAdjacentHTML("beforeend",
      `<span class="sortable-table__sort-arrow">
              <span class="sort-arrow"></span>
            </span>`);
  }

  _getCompareFn(direction, field) {
    return (a, b) => {
      function compareValues(a, b) {
        if (typeof a == 'number') {
          return (a - b);
        } else {
          return a.toString().localeCompare(b, 'ru', {caseFirst: 'upper'});
        }
      }

      switch (direction) {
        case 'asc':
          return compareValues(a[field], b[field]);
        case 'desc':
          return compareValues(a[field], b[field]) * (-1);
        default:
          break;
      }
    };
  }

  _getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  _getHeaderColumns() {
    const result = [];

    this.header.forEach(item => {
      result.push(
        `<div class="sortable-table__cell" data-name="${item.id}" data-sortable="${!item.template}">
           <span>${item.title}</span>
         </div>`);
    });

    return result.join('');
  }

  _getRows() {
    return this.data.map(item =>
      `<a href="${item.id}" class="sortable-table__row">
         ${this._getRowContent(item)}
       </a>`).join('');
  }

  _getRowContent(item) {
    return this.header.map(
      column =>
        column.template ?
        column.template(item[column.id]) :
        `<div class="sortable-table__cell">${item[column.id]}</div>`).join('');
  }

}

