import { useEffect, useRef, useContext } from "react";
import { Circle } from "./circle";
import { createRoot } from "react-dom/client";
import { CirclesContext } from "../../context/circlesContext";

type CircleControllerProps = {
  beat: number;
  isChorus?: boolean;
};

export const CircleController = ({ beat, isChorus }: CircleControllerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { circles } = useContext(CirclesContext);

  useEffect(() => {
    if (beat && beat > 0.7 && ref.current) {
      const circle = document.createElement("div");
      ref.current.appendChild(circle);
      const root = createRoot(circle);

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`;

      const circleRef = { current: circle };

      root.render(
        <Circle x={x} y={y} color={color} isChorus={isChorus} ref={circleRef} />
      );

      circles.push(circleRef);

      setTimeout(() => {
        circle.remove();
        circles.shift();
      }, 1100);
    }
  }, [beat]);

  return <div ref={ref}></div>;
};
