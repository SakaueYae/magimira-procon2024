import { useEffect, useRef } from "react";
import { Circle } from "./circle";
import { createRoot } from "react-dom/client";

type CircleControllerProps = {
  beat: number;
};

export const CircleController = ({ beat }: CircleControllerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (beat && beat > 0.8 && ref.current) {
      const circle = document.createElement("div");
      ref.current.appendChild(circle);
      const root = createRoot(circle);

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      root.render(<Circle x={x} y={y} />);

      setTimeout(() => {
        circle.remove();
      }, 5000);
    }
  }, [beat]);

  return <div ref={ref}></div>;
};
