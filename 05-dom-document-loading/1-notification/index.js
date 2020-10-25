export default class NotificationMessage {
  static existMessage;

  constructor(message = '',
              { duration = 1000,
                type = 'success'
              } = {}) {

    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  render() {
    const messageElem = document.createElement('div');

    messageElem.innerHTML =
    `<div class="notification ${this.type}" style="--value:${this.duration}ms">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
    </div>`;

    this.element = messageElem.firstElementChild;
  }

  show(target = document.body) {
    const parentElement = target;

    if (NotificationMessage.existMessage) {
      NotificationMessage.existMessage.remove();
    }

    NotificationMessage.existMessage = this.element;
    parentElement.append(this.element);
    setTimeout(() => this.remove(), this.duration);
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
}
