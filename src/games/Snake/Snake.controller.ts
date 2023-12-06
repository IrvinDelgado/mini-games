import { Position } from "../../common/types";
const BLOCK_WIDTH = 50;

export class SnakeController {
  snakeHead: Position = { x: 0, y: 0 };
  snakeTarget: Position = { x: 0, y: 0 };
  snakeTail: Position[] = [];
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
      x: xBlockCoord * BLOCK_WIDTH,
      y: yBlockCoord * BLOCK_WIDTH,
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
    ctx.arc(
      pos.x + BLOCK_WIDTH / 2,
      pos.y + BLOCK_WIDTH / 2,
      BLOCK_WIDTH / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }

  drawSnake(ctx: CanvasRenderingContext2D) {
    this.drawCircle(ctx, this.snakeHead);
    this.snakeTail?.forEach((snakePart) => this.drawCircle(ctx, snakePart));
  }

  drawSnakeTarget(ctx: CanvasRenderingContext2D) {
    this.drawCircle(ctx, this.snakeTarget, "#ffffff");
  }

  drawGame(ctx: CanvasRenderingContext2D, frameCount: number) {
    //console.log(frameCount)
    if (this.needNewTarget) {
      this.generateNewTargetPos(ctx);
      this.needNewTarget = false;
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.drawGrid(ctx);
    this.drawSnake(ctx);
    this.drawSnakeTarget(ctx);
  }

  isIntersecting(pos: Position, targetPos: Position) {
    if (pos.x === targetPos.x && pos.y === targetPos.y) {
      return true;
    }
    return false;
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
  moveSnakeTail() {
    const snakeTailHistory = [...this.snakeTail];
    this.snakeTail = this.snakeTail.map((_, idx) => {
      if (idx === 0) {
        return { ...this.snakeHead };
      }
      return snakeTailHistory[idx - 1];
    });
    console.log(this.snakeTail);
  }

  moveOnUserInput(direction: string, ctx: CanvasRenderingContext2D) {
    this.moveSnakeTail();
    switch (direction) {
      case "ArrowUp":
        if (this.snakeHead.y - BLOCK_WIDTH < 0) {
          return;
        }
        this.snakeHead.y -= BLOCK_WIDTH;
        break;
      case "ArrowRight":
        if (this.snakeHead.x + BLOCK_WIDTH > ctx.canvas.width - BLOCK_WIDTH) {
          return;
        }
        this.snakeHead.x += BLOCK_WIDTH;
        break;
      case "ArrowDown":
        if (this.snakeHead.y + BLOCK_WIDTH > ctx.canvas.height - BLOCK_WIDTH) {
          return;
        }
        this.snakeHead.y += BLOCK_WIDTH;
        break;
      case "ArrowLeft":
        if (this.snakeHead.x - BLOCK_WIDTH < 0) {
          return;
        }
        this.snakeHead.x -= BLOCK_WIDTH;
        break;
    }
    if (this.isIntersecting(this.snakeHead, this.snakeTarget)) {
      this.addToSnakeTail(direction);
      this.needNewTarget = true;
    }
  }
}
