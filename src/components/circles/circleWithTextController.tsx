import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Circle } from "./circle";

type CircleWithTextControllerProps = {
  text: string;
};

export const CircleWithTextController = ({
  text,
}: CircleWithTextControllerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const circle = document.createElement("div");
      ref.current.appendChild(circle);
      const root = createRoot(circle);

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      root.render(<Circle x={x} y={y} text={text} />);

      setTimeout(() => {
        circle.remove();
      }, 5000);
    }
  }, [text]);

  return <div ref={ref}></div>;
};
