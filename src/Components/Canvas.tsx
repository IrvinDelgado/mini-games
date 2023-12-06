import { forwardRef } from "react";
import { CanvasDraw } from "../hooks/useCanvas";

interface ICanvas extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  draw: CanvasDraw;
  height: string;
  width: string;
}

const Canvas = forwardRef(
  (props: ICanvas, ref: React.ForwardedRef<HTMLCanvasElement>) => {
    const { draw, height, width, ...rest } = props;

    return (
      <canvas
        ref={ref}
        {...rest}
        id="canvas"
        width={width}
        height={height}
      ></canvas>
    );
  }
);

export default Canvas;
