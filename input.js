let direction = { x: 0, y: 0 };
let lastDirection = { x: 0, y: 0 };

$(document).keydown(function (e) {
  switch (e.which) {
    case 38: //up arrow
      if (lastDirection.y !== 0) break;
      direction = { x: 0, y: -1 };
      break;
    case 40: //down arrow
      if (lastDirection.y != 0) break;
      direction = { x: 0, y: 1 };
      break;
    case 37: //left arrow
      if (lastDirection.x != 0) break;
      direction = { x: -1, y: 0 };
      break;
    case 39: // right arrow
      if (lastDirection.x != 0) break;
      direction = { x: 1, y: 0 };
      break;
  }
});

export function getDirection() {
  lastDirection = direction;
  return direction;
}

export function reinitDirection() {
  direction = { x: 0, y: 0 };
  lastDirection = { x: 0, y: 0 };
}
