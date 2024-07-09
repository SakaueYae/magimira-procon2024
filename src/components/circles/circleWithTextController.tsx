import { useContext, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { CircleWithText } from "./circleWithText";
import { CirclesContext } from "../../context/circlesContext";

type CircleWithTextControllerProps = {
  text: string;
  isChorus?: boolean;
};

export const CircleWithTextController = ({
  text,
  isChorus,
}: CircleWithTextControllerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const isMouseDown = useRef<boolean>(false);
  const { circles } = useContext(CirclesContext);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    });

    window.addEventListener("mousedown", () => {
      isMouseDown.current = true;
    });

    window.addEventListener("mouseup", () => {
      isMouseDown.current = false;
    });

    return () => {
      window.removeEventListener("mousemove", () => {});
      window.removeEventListener("mousedown", () => {});
      window.removeEventListener("mouseup", () => {});
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const circle = document.createElement("div");
    ref.current.appendChild(circle);
    const root = createRoot(circle);

    root.render(
      <CircleWithText
        x={position.x}
        y={position.y}
        text={text}
        isMouseDown={isMouseDown.current}
        circles={circles}
        isChorus={isChorus}
      />
    );

    setTimeout(
      () => {
        circle.remove();
      },
      isMouseDown.current ? 5000 : 9000
    );
  }, [text]);

  return <div ref={ref}></div>;
};
