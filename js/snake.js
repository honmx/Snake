export class Snake {
  constructor(container, score, oppositeKeys, bodySize) {
    this.head = document.querySelector(".snake__head");
    this.body = Array.from(document.querySelectorAll(".snake__body"));
    this.snake = [this.head, ...this.body];
    this.bodySize = bodySize;
    this.container = container;
    this.score = score;
    this.headDirection = this.head.dataset.direction;
    this.oppositeKeys = oppositeKeys;
    this.lastKeysPressed = [];
    this._alignBodyBeforeStart();
    document.addEventListener("keydown", (event) => {
      if (event.code === "ArrowUp" || event.code === "ArrowRight" || event.code === "ArrowLeft" || event.code === "ArrowDown") {
        if (this.lastKeysPressed.length < 3) this.lastKeysPressed.push(event.code);
      };
      if (event.code === "Space") this.lastKeysPressed = [];
    })
  }

  _alignBodyBeforeStart() {
    switch (this.headDirection) {
      case "up":
        this._align(-this.head.offsetHeight, 0, "up");
        break;
      case "right":
        this._align(0, this.head.offsetWidth, "right");
        break;
      case "left":
        this._align(0, -this.head.offsetWidth, "left");
        break;
      case "down":
        this._align(this.head.offsetHeight, 0, "down");
    }
  }

  _align(height, width, direction) {
    let previousElem = this.head;
    this.body.forEach(elem => {
      this._alignElem(elem, previousElem, this.container, width, height);
      elem.dataset.direction = direction;
      previousElem = elem;
    });
  }

  _alignElem(elem, previousElem, container, width, height) {
    elem.style.top = previousElem.getBoundingClientRect().top - container.getBoundingClientRect().top - height + "px";
    elem.style.left = previousElem.getBoundingClientRect().left - container.getBoundingClientRect().left - width + "px";
  }

  move() {
    switch (this.lastKeysPressed[0]) {
      case "ArrowUp":
        if (this.head.dataset.direction === "down") this._changePosition("down");
        else this._changePosition("up");
        break;
      case "ArrowRight":
        if (this.head.dataset.direction === "left") this._changePosition("left");
        else this._changePosition("right");
        break;
      case "ArrowLeft":
        if (this.head.dataset.direction === "right") this._changePosition("right");
        else this._changePosition("left");
        break;
      case "ArrowDown":
        if (this.head.dataset.direction === "up") this._changePosition("up");
        else this._changePosition("down");
        break;
    }

    const index = this._getIndexOfBodyIntersection();
    this._shrink(index);

    if (this.lastKeysPressed.length > 1) this.lastKeysPressed.shift();

    // console.log(this.head.getBoundingClientRect().left - this.container.getBoundingClientRect().left);
    // console.log(this.container.offsetWidth);
  }

  grow() {
    const lastElem = this.body[this.body.length-1];
    const newElem = document.createElement("div");
    newElem.classList.add("snake__body", "snake");

    lastElem.after(newElem);
    this.body.push(newElem);
    this.snake.push(newElem);
    
    switch (lastElem.dataset.direction) {
      case "up":
        this._alignElem(newElem, lastElem, this.container, 0, -this.bodySize);
        break;
      case "right":
        this._alignElem(newElem, lastElem, this.container, this.bodySize, 0);
        break;
      case "left":
        this._alignElem(newElem, lastElem, this.container, -this.bodySize, 0);
        break;
      case "down":
        this._alignElem(newElem, lastElem, this.container, 0, this.bodySize);
        break;  
    }
  }

  _shrink(index) {
    for (let i = index; i < this.body.length;) {
      const elemToDelete = this.body[i];
      this.body.splice(i, 1);
      this.snake.splice(i+1, 1);
      elemToDelete.remove();
      this.score.down();
    }
  }

  _getIndexOfBodyIntersection() {
    const headCords = {
      x: this.head.getBoundingClientRect().left + 5,
      y: this.head.getBoundingClientRect().top + 5
    }

    this.head.style.display = "none";

    const elem = document.elementFromPoint(headCords.x, headCords.y); 
    let index = Infinity;

    if (elem.classList.contains("snake")) {
      for (let i = 0; i < this.body.length; i++) {
        if (this.body[i] === elem) index = i;
      }
    }
    
    this.head.style.display = "";
    return index;
  }

  _isHeadOutsideField() {
    return !document.elementFromPoint(this.head.getBoundingClientRect().left, this.head.getBoundingClientRect().top).classList.contains("snake");
  }

  _changePosition(direction) {
    for (let i = this.snake.length - 1; i > 0; i--) {
      this._alignElem(this.snake[i], this.snake[i-1], this.container, 0, 0);
      this.snake[i].dataset.direction = this.snake[i-1].dataset.direction;
    }
    
    this.head.dataset.direction = direction;

    console.log(this._isHeadOutsideField());

    switch (direction) {
      case "up":
        if (this._isHeadOutsideField()) {
          this.head.style.top = this.container.offsetHeight - this.head.offsetHeight / 2 + "px";
          break;
        }
        this._alignElem(this.head, this.head, this.container, this.head.offsetWidth / 2, this.head.offsetHeight / 2);
        break;
      case "right":
        if (this._isHeadOutsideField()) {
          this.head.style.left = -this.head.offsetWidth / 2 + "px";
          break;
        }
        this._alignElem(this.head, this.head, this.container, -this.head.offsetWidth / 2, -this.head.offsetHeight / 2);
        break;
      case "left":
        if (this._isHeadOutsideField()) {
          this.head.style.left = this.container.offsetWidth - this.head.offsetWidth * 1.5 + "px";
          break;
        }
        this._alignElem(this.head, this.head, this.container, this.head.offsetWidth * 1.5, -this.head.offsetHeight / 2);
        break;
      case "down":
        if (this._isHeadOutsideField()) {
          this.head.style.top = this.head.offsetHeight / 2 + "px";
          break;
        }
        this._alignElem(this.head, this.head, this.container, this.head.offsetWidth / 2, -this.head.offsetHeight * 1.5);
        break;
    }
  }
}