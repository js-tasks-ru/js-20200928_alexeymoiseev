export default class ColumnChart {
  element;
  chartHeight = 50;

  constructor({ data = [],
                label = '',
                value = 0,
                link = '',
              } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;

    this.render();
  }

  getDataHTML() {
    const maxValue = Math.max(...this.data);
    const scale = this.chartHeight / maxValue;

    return this.data.map(item =>
      `<div
        style="--value: ${String(Math.floor(item * scale))}"
        data-tooltip="${(item / maxValue * 100).toFixed(0)}%"
      ></div>`
    ).join('');
  }

  getLinkHTML() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">Посмотреть все</a>` : '';
  }

  render() {
    const element = document.createElement('div');
    element.className = `column-chart ${this.data.length > 0 ? '' : 'column-chart_loading'}`;
    element.style = `--chart-height: ${this.chartHeight};`;
    element.innerHTML = `
      <div class='column-chart__title'>
        Total ${this.label}
        ${this.getLinkHTML(this.link)}
      </div>
      <div class="column-chart__container">
        <div class="column-chart__header">${this.value}</div>
        <div class="column-chart__chart">
          ${this.getDataHTML(this.data)}
        </div>
      </div>
    `;
    this.element = element;
  }

  update(data) {
    this.data = data;
    this.render();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
