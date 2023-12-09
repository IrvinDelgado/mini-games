import { DIRECTION, KEYBOARD, Position } from "../../common/types";
const BLOCK_WIDTH = 50;

export class SnakeController {
  snakeHead: Position = { x: BLOCK_WIDTH, y: BLOCK_WIDTH };
  snakeTarget: Position = { x: 0, y: 0 };
  snakeTail: Position[] = [];
  snakeDirection = DIRECTION.RIGHT;
  newSnakeDirection = DIRECTION.RIGHT;
  needNewTarget = true;

  generateNewTargetPos(ctx: CanvasRenderingContext2D) {
    // Generate Block Coordinates
    const xBlockCoord = Math.floor(
      Math.random() * (ctx.canvas.width / BLOCK_WIDTH)
    );
    const yBlockCoord = Math.floor(
      Math.random() * (ctx.canvas.height / BLOCK_WIDTH)
    );
    // Convert Block Coordinates to Canvas Coord
    const targetPosition = {
      x: xBlockCoord * BLOCK_WIDTH * 2 + BLOCK_WIDTH,
      y: yBlockCoord * BLOCK_WIDTH * 2 + BLOCK_WIDTH,
    };
    this.snakeTarget = targetPosition;
  }

  drawGrid(ctx: CanvasRenderingContext2D) {
    const boardWidth = ctx.canvas.width;
    const boardHeight = ctx.canvas.height;
    let [x, y] = [0, 0];
    // Draw Vertical Lines
    while (x < boardWidth) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, boardHeight);
      x += BLOCK_WIDTH;
    }
    // Draw Horizontal Lines
    while (y < boardHeight) {
      ctx.moveTo(0, y);
      ctx.lineTo(boardWidth, y);
      y += BLOCK_WIDTH;
    }
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  drawCircle(
    ctx: CanvasRenderingContext2D,
    pos: Position,
    fill: string = "#000000"
  ) {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(pos.x / 2, pos.y / 2, BLOCK_WIDTH / 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  drawSnake(ctx: CanvasRenderingContext2D) {
    this.drawCircle(ctx, this.snakeHead);
    this.snakeTail?.forEach((snakePart) => this.drawCircle(ctx, snakePart));
  }

  drawSnakeTarget(ctx: CanvasRenderingContext2D) {
    this.drawCircle(ctx, this.snakeTarget, "#ffffff");
  }

  drawGame(ctx: CanvasRenderingContext2D) {
    const isSwitchable =
      this.snakeDirection !== this.newSnakeDirection &&
      this.snakeHead.x % BLOCK_WIDTH === 0 &&
      this.snakeHead.x % (BLOCK_WIDTH * 2) !== 0 &&
      this.snakeHead.y % BLOCK_WIDTH === 0 &&
      this.snakeHead.y % (BLOCK_WIDTH * 2) !== 0;
    if (isSwitchable) {
      this.snakeDirection = this.newSnakeDirection;
    }
    if (this.needNewTarget) {
      this.generateNewTargetPos(ctx);
      this.needNewTarget = false;
    }
    this.drawGrid(ctx);
    this.drawSnake(ctx);
    this.drawSnakeTarget(ctx);
    const withinBounds =
      this.snakeHead.x >= BLOCK_WIDTH &&
      this.snakeHead.y >= BLOCK_WIDTH &&
      this.snakeHead.x <= ctx.canvas.width * 2 &&
      this.snakeHead.y <= ctx.canvas.height * 2;
    if (withinBounds) {
      this.moveSnake();
    }
  }

  addToSnakeTail(direction: string) {
    const snakeTailEnd: Position =
      this.snakeTail.length > 0
        ? this.snakeTail[this.snakeTail.length - 1]
        : this.snakeHead;
    switch (direction) {
      case "ArrowUp":
        this.snakeTail.push({
          x: snakeTailEnd.x,
          y: snakeTailEnd.y + BLOCK_WIDTH,
        });
        break;
      case "ArrowRight":
        this.snakeTail.push({
          x: snakeTailEnd.x - BLOCK_WIDTH,
          y: snakeTailEnd.y,
        });
        break;
      case "ArrowDown":
        this.snakeTail.push({
          x: snakeTailEnd.x,
          y: snakeTailEnd.y - BLOCK_WIDTH,
        });
        break;
      case "ArrowLeft":
        this.snakeTail.push({
          x: snakeTailEnd.x + BLOCK_WIDTH,
          y: snakeTailEnd.y,
        });
        break;
    }
  }

  moveSnake() {
    const VELOCITY = 10;
    // Move Snake Head
    switch (this.snakeDirection) {
      case DIRECTION.UP:
        this.snakeHead.y -= VELOCITY;
        break;
      case DIRECTION.RIGHT:
        this.snakeHead.x += VELOCITY;
        break;
      case DIRECTION.DOWN:
        this.snakeHead.y += VELOCITY;
        break;
      case DIRECTION.LEFT:
        this.snakeHead.x -= VELOCITY;
        break;
    }

    // Move Snake Tail
    const snakeTailHistory = [...this.snakeTail];
    this.snakeTail = this.snakeTail.map((_, idx) => {
      if (idx === 0) {
        return { ...this.snakeHead };
      }
      return snakeTailHistory[idx - 1];
    });
  }

  moveOnUserInput(key: KEYBOARD) {
    switch (key) {
      case KEYBOARD.UP:
        this.newSnakeDirection =
          this.snakeDirection === DIRECTION.DOWN
            ? DIRECTION.DOWN
            : DIRECTION.UP;
        break;
      case KEYBOARD.RIGHT:
        this.newSnakeDirection =
          this.snakeDirection === DIRECTION.LEFT
            ? DIRECTION.LEFT
            : DIRECTION.RIGHT;
        break;
      case KEYBOARD.DOWN:
        this.newSnakeDirection =
          this.snakeDirection === DIRECTION.UP ? DIRECTION.UP : DIRECTION.DOWN;
        break;
      case KEYBOARD.LEFT:
        this.newSnakeDirection =
          this.snakeDirection === DIRECTION.RIGHT
            ? DIRECTION.RIGHT
            : DIRECTION.LEFT;
        break;
    }
  }
}
