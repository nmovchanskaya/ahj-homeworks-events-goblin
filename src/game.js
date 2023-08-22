import Field from './field';

export default class Game {
  constructor(fieldElem, scoreElem) {
    this.fieldElem = fieldElem;
    this.field = new Field(fieldElem);
    this.score = scoreElem;
    this.points = 0;
    this.goblinIdx = this.getNewPosition(-1);
    this.failedPoints = 0;
  }

  // add event listener
  // when click + if cell has goblin in it -> increase points
  init(fieldElem) {
    fieldElem.addEventListener('click', (e) => {
      if (e.target.classList.contains('goblin')) {
        this.points++;
        this.failed = false;
        this.score.textContent = `Score: ${this.points}`;
        e.target.classList.remove('goblin');
      }
    });
    this.renderGoblin(this.goblinIdx);
  }

  renderGoblin(idx) {
    this.field.cells[idx].classList.add('goblin');
  }

  // random move to different cell
  move() {
    if (this.failed) {
      this.failedPoints++;
      if (this.failedPoints === 5) {
        alert('Game over!');
        this.restart();
      }
    }

    // remove old one if we have
    const goblinIdx = this.field.cells.findIndex((item) => item.classList.contains('goblin'));
    if (goblinIdx > -1) {
      this.field.cells[goblinIdx].classList.remove('goblin');
    }

    // move to another cell
    this.goblinIdx = this.getNewPosition(this.goblinIdx);
    this.renderGoblin(this.goblinIdx);

    this.failed = true;
  }

  getNewPosition(goblinIdx) {
    const randIdx = Math.floor(Math.random() * this.field.cells.length);
    if (goblinIdx === randIdx) {
      return this.getNewPosition(goblinIdx);
    }
    return randIdx;
  }

  restart() {
    this.points = 0;
    this.score.textContent = `Score: ${this.points}`;
    this.failedPoints = 0;
    this.init(this.fieldElem);
  }
}
