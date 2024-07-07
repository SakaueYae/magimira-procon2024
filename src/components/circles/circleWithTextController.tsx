import { useContext, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { CircleWithText } from "./circleWithText";
import { CirclesContext } from "../../context/circlesContext";

type CircleWithTextControllerProps = {
  text: string;
  phrase?: string;
};

/** ランダム表示の場合
 * 1. phraseが更新されるたびに縦か横をランダムに選択
 * 2. 縦が選択されたら上→下、横が選択されたら左→右にtextを表示
 * 3. 画面端に到達したら改行、ランダムな位置からまたスタート
 */

/**
 * 消えるとき、文字が水に溶けるようなアニメーションにしたい
 */

export const CircleWithTextController = ({
  text,
}: CircleWithTextControllerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    color?: string;
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

      const { clientX, clientY } = e;
      const element = document.elementFromPoint(clientX, clientY);
      if (
        element?.attributes
          .getNamedItem("style")
          ?.value.includes("border-color")
      ) {
        const color = element?.attributes
          .getNamedItem("style")
          ?.value.split("border-color: ")[1]
          .split(";")[0];
        setPosition((prev) => ({ ...prev, color }));
      } else {
        setPosition((prev) => ({ ...prev, color: undefined }));
      }
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
        color={position.color}
        isMouseDown={isMouseDown.current}
        circles={circles}
      />
    );

    setTimeout(() => {
      circle.remove();
    }, 5000);
  }, [text]);

  return <div ref={ref}></div>;
};
