export default class Game {
  constructor(field, scoreElem) {
    this.field = field;
    this.score = scoreElem;
    this.points = 0;
    this.goblinIdx = -1;
    this.failedPoints = 0;
    this.init();
  }

  init() {
    // add event listeners
    // if cell has goblin in it -> increase points
    this.field.cells.forEach((item) => {
      item.addEventListener('click', (e) => {
        // if we have goblin in this clicked cell -> points+1
        if (e.target.classList.contains('goblin')) {
          this.points++;
          this.failed = false;
          this.score.textContent = `Score: ${this.points}`;
          e.target.className = 'goblin-hidden';
        }
      });
    });
  }

  // random move to different cell
  move(failed) {
    if (failed || this.failed) {
      this.failedPoints++;
      if (this.failedPoints === 5) {
        alert('Game over!');
        this.restart();
      }
    }
    let goblinElem = document.querySelector('.goblin');
    if (!goblinElem) {
      goblinElem = document.querySelector('.goblin-hidden');
    }

    // move to another
    const newdIdx = this.getNewPosition(this.goblinIdx);
    this.goblinIdx = newdIdx;
    goblinElem.className = 'goblin';
    this.field.cells[newdIdx].appendChild(goblinElem);

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
    this.init();
  }
}
