export default class Field {
  constructor(element) {
    this.cells = [];

    for (let i = 0; i < 16; i++) {
      const item = document.createElement('div');
      item.classList.add('cell');
      this.cells.push(item);
      element.insertBefore(item, null);
    }
  }
}
