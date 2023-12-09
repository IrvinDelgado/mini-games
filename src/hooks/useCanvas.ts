import { useRef, useEffect } from "react";

type seconds = number;

export type CanvasDrawParams = (
  ctx: CanvasRenderingContext2D,
  frameCount: number,
  passedTime: seconds
) => void;

const useCanvas = (draw: CanvasDrawParams) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !canvas) return;
    let frameCount = 0;
    let animationFrameId: number;
    let timePassedSeconds = 0;

    const render = (passedTime: number) => {
      const timePassedSeconds = passedTime * 0.001;
      frameCount++;
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      draw(context, frameCount, timePassedSeconds);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render(timePassedSeconds);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
