import { useEffect } from "react";
import Canvas from "../../components/Canvas";
import styles from "./Snake.module.css";
import { SnakeController } from "./Snake.controller";
import useCanvas, { CanvasDrawParams } from "../../hooks/useCanvas";
import { KEYBOARD } from "../../common/types";

const snakeController = new SnakeController();
const Snake = () => {
  const draw: CanvasDrawParams = (ctx, frameCount, timePassed) =>
    snakeController.drawGame(ctx, frameCount, timePassed);
  const canvasRef = useCanvas(draw);

  useEffect(() => {
    const handleUserInput = (e: KeyboardEvent) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) {
        return;
      }
      snakeController.moveOnUserInput(e.key as KEYBOARD);
    };
    document.addEventListener("keydown", handleUserInput);
    return () => document.removeEventListener("keydown", handleUserInput);
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      draw={draw}
      height="500"
      width="500"
      className={styles.canvas}
    />
  );
};

export default Snake;
