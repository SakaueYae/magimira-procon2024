import styled from "styled-components";
import { distance2D, motion, useAnimation } from "framer-motion";
import { BasicCircle } from "./basicCircle";
import { useEffect, useRef, useState } from "react";

type CircleWithTextProps = {
  x: number;
  y: number;
  text: string;
  color?: string;
  isChorus?: boolean;
  isMouseDown?: boolean;
  circles?: HTMLElement[];
};

/**
 * それぞれのCircleWithTextに対して、以下の処理を行う形式がよさそう？
 * 1. 生成されたCircleWithTextのrefをuseInViewのrootとする
 * 2. 何らかの方法で今生成されているCircleを取得、これらを監視対象とする
 * 3. CircleWithTextにCircleが重なったときに、重なったCircleを取得してその色を反映する
 */
export const CircleWithText = ({
  x,
  y,
  text,
  color,
  isChorus,
  isMouseDown,
  circles = [],
}: CircleWithTextProps) => {
  const [borderColor, setBorderColor] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  /** ResizeObserverでの処理、半径の和で計算 */
  useEffect(() => {
    const element = ref.current;
    const observer = new ResizeObserver(() => {
      for (const circle of circles) {
        if (circle) {
          const circleX = circle.children[0].getAttribute("x");
          const circleY = circle.children[0].getAttribute("y");
          const d = distance2D(
            { x, y },
            { x: Number(circleX), y: Number(circleY) }
          );
          const r = ref.current?.offsetHeight ?? 0 / 2;
          if (d < r + 250) {
            // 固定長
            // console.log("hit");
            // console.log(d, r, circle.offsetHeight, circle);
            const color = circle.children[0].children[0].getAttribute("color");

            if (color) {
              if (color.includes("rgba")) {
                const splitColor = color.split(" ");
                const borderColorWithoutOpacity =
                  splitColor[0] + " " + splitColor[1] + " " + splitColor[2];
                controls.start({
                  borderColor: borderColorWithoutOpacity + " 1)",
                  color: borderColorWithoutOpacity + " 1)",
                });
              } else {
                controls.start({ borderColor: color, color: color });
              }
            }
          }
        }
      }
    });

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [circles, x, y]);

  const basicCircleVariant = {
    created: {
      scale: !isChorus ? [0.5, 3, 3] : [0.5, 5, 5],
      borderColor,
      opacity: [1, 0, 0],
      transition: { duration: 4, times: [0, 0.25, 1] },
    },
  };

  const delayBasicVariant = {
    created: {
      scale: !isChorus ? 3 : 5,
      opacity: 0,
      transition: { duration: 1, delay: 0.1 },
    },
  };

  const textVariant = {
    created: {
      scale: [0.5, 3, 3],
      opacity: [1, 1, 0],
      filter: ["blur(0px)", "blur(0px)", "blur(10px)"],
      transition: { duration: 4, times: [0, 0.25, 1] },
    },
  };

  useEffect(() => {
    if (color) {
      const splitColor = color.split(" ");
      const borderColorWithoutOpacity =
        splitColor[0] + " " + splitColor[1] + " " + splitColor[2];
      const borderColor = [
        borderColorWithoutOpacity + " 1)",
        borderColorWithoutOpacity + " 0)",
        borderColorWithoutOpacity + " 0)",
      ];
      setBorderColor(borderColor);
    } else {
      setBorderColor([
        "rgba(255, 255, 255, 1)",
        "rgba(255, 255, 255, 0)",
        "rgba(255, 255, 255, 0)",
      ]);
    }
  }, [color]);

  useEffect(() => {
    controls.start("created");
  }, []);

  return (
    <Container x={x} y={y} ref={ref}>
      <BasicCircle
        animate={controls}
        variants={basicCircleVariant}
        color={color}
      />
      {isMouseDown && ( // 改善の余地あり
        <BasicCircle
          initial={{
            scale: 0.5,
            borderColor: color ?? "rgba(255, 255, 255, 1)",
          }}
          animate={controls}
          variants={delayBasicVariant}
          color={color}
        />
      )}
      <Text animate={controls} variants={textVariant}>
        {text}
      </Text>
    </Container>
  );
};

const Container = styled.div<{
  x: number;
  y: number;
}>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

const Text = styled(motion.p)`
  font-size: 20px;
  font-family: serif;
  color: rgba(255, 255, 255, 1);
  margin: 0;
  opacity: 2;
`;
