import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { CircleWithText } from "./circleWithText";

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
  phrase = "この声は何もないとこから始まった",
}: CircleWithTextControllerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [nowPhrase, setNowPhrase] = useState<string>("");
  const [position, setPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  // const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setPosition({
        x: e.clientX, // 動的に変わらないので注意
        y: e.clientY,
      });
    });
  }, []);

  useEffect(() => {
    // if (phrase !== nowPhrase) {
    //   setNowPhrase(phrase);
    //   setPosition({
    //     x: Math.random() * (window.innerWidth - 100),
    //     y: Math.random() * (window.innerHeight - 100),
    //   });
    // } else {
    // const filteredAngles = angles.filter((angle) => {
    //   if (position.angle === null) return true; // 初回はすべての角度を利用可能
    //   return Math.abs(angle - position.angle) !== Math.PI;
    // });
    // const angle =
    //   filteredAngles[Math.floor(Math.random() * filteredAngles.length)];

    // const x =
    //   position.x +
    //   Math.random() * 100 * Math.cos(angle) +
    //   Math.sign(Math.cos(angle)) * 50;
    // const y =
    //   position.y +
    //   Math.random() * 100 * Math.sin(angle) +
    //   Math.sign(Math.sin(angle)) * 50;
    // console.log(text, x, y, angle);

    // setPosition({
    //   x:
    //     x < 0 ? 0 : x > window.innerWidth - 100 ? window.innerWidth - 100 : x,
    //   y:
    //     y < 0
    //       ? 0
    //       : y > window.innerHeight - 100
    //       ? window.innerHeight - 100
    //       : y,
    // });
    // }

    if (!ref.current) return;
    const circle = document.createElement("div");
    ref.current.appendChild(circle);
    const root = createRoot(circle);

    root.render(<CircleWithText x={position.x} y={position.y} text={text} />);

    setTimeout(() => {
      circle.remove();
    }, 5000);
  }, [text, phrase]);

  // useEffect(() => {
  //   if (!ref.current) return;
  //   const circle = document.createElement("div");
  //   ref.current.appendChild(circle);
  //   const root = createRoot(circle);

  //   root.render(<Circle x={position.x} y={position.y} text={text} />);

  //   setTimeout(() => {
  //     circle.remove();
  //   }, 5000);
  // }, [position]);

  return <div ref={ref}></div>;
};
