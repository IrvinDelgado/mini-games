import { Position } from "../common/types";
import { BLOCK_WIDTH } from "../common/constants";

export class GameController {
  moveOnUserInput(input: string, pos: Position) {
    const newPos = { ...pos };
    switch (input) {
      case "ArrowUp":
        newPos.y -= BLOCK_WIDTH;
        break;
      case "ArrowRight":
        newPos.x += BLOCK_WIDTH;
        break;
      case "ArrowDown":
        newPos.y += BLOCK_WIDTH;
        break;
      case "ArrowLeft":
        newPos.x -= BLOCK_WIDTH;
        break;
    }
    return newPos;
  }
}
