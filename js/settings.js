"use strict";

const oppositeKeys = {};

Object.defineProperties(oppositeKeys, {
  "ArrowRight": {value: "ArrowLeft", writable: false},
  "ArrowLeft": {value: "ArrowRight", writable: false},
  "ArrowDown": {value: "ArrowUp", writable: false},
  "ArrowUp": {value: "ArrowDown", writable: false},
})

export const settings = {
  oppositeKeys,
  getSnakeBodySize() {
    return document.querySelector(".snake").offsetWidth;
  },
}