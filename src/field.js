export default class Field {
  constructor(element) {
    this.cells = [];

    for (let i = 0; i < 4; i++) {
      const div = document.createElement('div');
      div.classList.add('field-str');
      element.insertBefore(div, null);
      for (let j = 0; j < 4; j++) {
        const item = document.createElement('div');
        item.classList.add('cell');
        this.cells.push(item);
        div.insertBefore(item, null);
      }
    }
  }
}
