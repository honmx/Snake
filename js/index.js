"use strict";

import { Game } from "./game.js"

const startBtn = document.querySelector(".start-btn");
const container = document.querySelector(".container");
const speed = document.querySelector(".speed-input");

startBtn.addEventListener("click", (event) => {
  container.innerHTML = `
  <div class="container__field field">
    <div class="snake__head snake" data-direction="right">
      <div class="eyes">
        <div class="eye"></div>
        <div class="eye"></div>
      </div>
    </div>
    <div class="snake__body snake"></div>
    <div class="snake__body snake"></div>
    <div class="apple"></div>
  </div>`;

  const game = new Game(+speed.value, container);
});