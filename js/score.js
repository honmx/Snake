export class Score {
  constructor(container) {
    this.container = container;
    this.scoreValue = 0;
    this.scoreElement = this._createScore();
  }

  up() {
    this.scoreElement.textContent = ++this.scoreValue;
  }

  down() {
    this.scoreElement.textContent = --this.scoreValue;
  }

  _createScore() {
    const score = document.createElement("p");
    score.classList.add("score", "text");
    score.textContent = this.scoreValue;
    this.container.parentNode.prepend(score);
    return score;
  }

}