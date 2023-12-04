import { useEffect, useRef } from "react";
import Canvas from "../components/Canvas";
import { GameController } from "../components/GameController";
import { Position } from "../common/types";

const controller = new GameController();

const Snake = () => {
  const currPos = useRef<Position>({ x: 0, y: 0 });

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(
      currPos.current.x + 20,
      currPos.current.y + 20,
      20 * Math.sin(frameCount * 0.05) ** 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
  };

  useEffect(() => {
    const handleUserInput = (e: KeyboardEvent) => {
      currPos.current = controller.moveOnUserInput(e.key, currPos.current);
    };
    document.addEventListener("keydown", handleUserInput);
    return () => removeEventListener("keydown", handleUserInput);
  });

  return <Canvas draw={draw} />;
};

export default Snake;
