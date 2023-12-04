import { Position } from "../common/types";
import { BLOCK_SPACE } from "../common/constants";

export class GameController {
  moveOnUserInput(input: string, pos: Position) {
    const newPos = { ...pos };
    switch (input) {
      case "ArrowUp":
        newPos.y -= BLOCK_SPACE;
        break;
      case "ArrowRight":
        newPos.x += BLOCK_SPACE;
        break;
      case "ArrowDown":
        newPos.y += BLOCK_SPACE;
        break;
      case "ArrowLeft":
        newPos.x -= BLOCK_SPACE;
        break;
    }
    return newPos;
  }
}
