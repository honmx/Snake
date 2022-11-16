import { Snake } from "./snake.js";
import { Apple } from "./apple.js";
import { settings } from "./settings.js";
import { Score } from "./score.js";

export class Game {
  constructor(speed, field) {
    this._speed = speed;
    this.field = field;
    this.score = new Score(this.field);
    this._snake = new Snake(this.field, this.score, settings.oppositeKeys, settings.getSnakeBodySize());
    this.snakeSize = settings.getSnakeBodySize();
    this._apple = new Apple(this.field, this.snakeSize);
    this.interval = this.update(this._speed);
  }

  update(speed) {
    return setInterval(() => {
      this._snake.move();

      if (this._apple.isEaten()) {
        this._apple.spawn(this.snakeSize);
        this._snake.grow();
        this.score.up();
      }
    }, (1000 - speed * 75) / 7);
  }
}