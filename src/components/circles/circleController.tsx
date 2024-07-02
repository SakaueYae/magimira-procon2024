import { useEffect, useRef, useState } from "react";
import { Circle } from "./circle";
import { createRoot } from "react-dom/client";

type CircleControllerProps = {
  beat: number;
  isChorus?: boolean;
};

export const CircleController = ({ beat, isChorus }: CircleControllerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [circleData, setCircleData] = useState<{
    x: number;
    y: number;
    color: string;
  }>({
    x: 0,
    y: 0,
    color: "",
  });

  useEffect(() => {
    if (beat && beat > 0.8 && ref.current) {
      const circle = document.createElement("div");
      ref.current.appendChild(circle);
      const root = createRoot(circle);

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`;

      root.render(<Circle x={x} y={y} color={color} isChorus={isChorus} />);

      setTimeout(() => {
        circle.remove();
      }, 5000);
    }
  }, [beat]);

  return <div ref={ref}></div>;
};
