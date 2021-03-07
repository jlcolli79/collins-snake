import { getDirection, reinitDirection } from "./input.js";
let intervalID;
const SNAKE_SPEED = 1.5;
const EXAPAND_RATE = 1;
const GRID_SIZE = 21;
let score;
let snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;
let food = randomFoodPosition();
const gameBoard = $("#game-board");
let gameOver = false;

function startGameLoop() {
  intervalID = setInterval(function () {
    if (gameOver) {
      confirm(
        `Game over! Press ok to retry. Your score is: ${score} apples eaten!`
      );
      gameOver = false;
      newSegments = 0;
      snakeBody = [{ x: 11, y: 11 }];
      food = randomFoodPosition();
      reinitDirection();
      score = 0;
    }

    updateSnake();
    renderSnake();
    updateFood();
    renderFood();
    checkGameOver();
    score = snakeBody.length - 1;
  }, SNAKE_SPEED * 100);
}
startGameLoop();

function updateSnake() {
  addSegments();
  const direction = getDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += direction.x;
  snakeBody[0].y += direction.y;
}

function growSnake(segments) {
  newSegments += segments;
}

function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPosition(segment, position);
  });
}

function equalPosition(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}

function renderSnake() {
  gameBoard.html("");
  snakeBody.forEach((segment) => {
    const snakeBody = $(`<div class="snake"></div>`);
    $(snakeBody).css("grid-row-start", segment.y);
    $(snakeBody).css("grid-column-start", segment.x);
    gameBoard.append(snakeBody);
  });
}

function updateFood() {
  if (onSnake(food)) {
    growSnake(EXAPAND_RATE);
    food = randomFoodPosition();
  }
}

function renderFood() {
  const foodItem = $(`<div class="food"></div>`);
  $(foodItem).css("grid-row-start", food.y);
  $(foodItem).css("grid-column-start", food.x);
  gameBoard.append(foodItem);
}

function randomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}

function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
}

function checkGameOver() {
  gameOver = outOfBounds(getHead()) || intersect();
}

function outOfBounds(position) {
  return (
    position.x < 1 ||
    position.x > GRID_SIZE ||
    position.y < 1 ||
    position.y > GRID_SIZE
  );
}

function getHead() {
  return snakeBody[0];
}

function intersect() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}
