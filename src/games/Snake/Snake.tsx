import { useEffect } from "react";
import Canvas from "../../components/Canvas";
import styles from "./Snake.module.css";
import { SnakeController } from "./Snake.controller";
import useCanvas from "../../hooks/useCanvas";

const snakeController = new SnakeController();
const Snake = () => {
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) =>
    snakeController.drawGame(ctx, frameCount);
  const canvasRef = useCanvas(draw);

  useEffect(() => {
    const handleUserInput = (e: KeyboardEvent) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) {
        return;
      }
      snakeController.moveOnUserInput(e.key, ctx);
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
