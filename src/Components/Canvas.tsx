import useCanvas, { CanvasDraw } from "./hooks/useCanvas";

interface ICanvas extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  draw: CanvasDraw;
}

const Canvas = (props: ICanvas) => {
  const { draw, ...rest } = props;

  const canvasRef = useCanvas(draw);

  return (
    <canvas
      ref={canvasRef}
      {...rest}
      id="canvas"
      width="800"
      height="600"
    ></canvas>
  );
};

export default Canvas;
