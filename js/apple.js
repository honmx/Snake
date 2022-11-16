export class Apple {
  constructor(container, size) {
    this._container = container;
    this.apple = document.querySelector(".apple");
    this._x = this.apple.getBoundingClientRect().left;
    this._y = this.apple.getBoundingClientRect().top;
    this._currentX = this._x;
    this._currentY = this._y;
    this.spawn(size);
  }

  spawn(size) {
    const possibleXPlaces = Math.round(Math.round(this._container.clientWidth / size) / 2) - 3;
    const possibleYPlaces = Math.round(Math.round(this._container.clientHeight / size) / 2) - 3;
    
    let randomXCoef = Math.floor(Math.random () * (possibleXPlaces + possibleXPlaces + 1)) - possibleXPlaces;
    let randomYCoef = Math.floor(Math.random () * (possibleYPlaces + possibleYPlaces + 1)) - possibleYPlaces;

    let newX = this._x + randomXCoef * size - this._container.getBoundingClientRect().left + 6;
    let newY = this._y + randomYCoef * size - this._container.getBoundingClientRect().top + 6;

    if (document.elementFromPoint(newX + this._container.getBoundingClientRect().left, newY + this._container.getBoundingClientRect().top).classList.contains("snake")) this.spawn(size);
    else {
      this.apple.style.left = newX + "px";
      this.apple.style.top = newY + "px";
      this._currentX = this.apple.getBoundingClientRect().left;
      this._currentY = this.apple.getBoundingClientRect().top;
    }
  }

  isEaten() {
    if (document.elementFromPoint(this._currentX, this._currentY).classList.contains("snake")) return true;
    return false;
  }
}