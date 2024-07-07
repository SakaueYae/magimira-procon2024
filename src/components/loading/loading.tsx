import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";

type LoadingProps = {
  isLoading: boolean;
  onClick: () => void;
};

export const Loading = ({ isLoading, onClick }: LoadingProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentInterval, setCurrentInterval] = useState<number>(0);
  const basicCircleVariant = {
    loading: {
      borderColor: [
        "rgba(255, 255, 255, 1)",
        "rgba(255, 255, 255, 0)",
        "rgba(255, 255, 255, 1)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
    clicked: {
      scale: 1.5,
      opacity: 0,
      filter: "blur(10px)",
      transition: {
        duration: 1,
      },
    },
  };
  const circleVariant = {
    loading: {
      scale: [1, 5],
      borderColor: ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"],
    },
  };

  useEffect(() => {
    if (ref.current && isLoading) {
      const interval = setInterval(() => {
        const circle = document.createElement("div");
        if (!ref.current) return;
        ref.current.appendChild(circle);
        const root = createRoot(circle);

        root.render(
          <Circle
            animate="loading"
            variants={circleVariant}
            transition={{
              duration: 8,
            }}
          />
        );

        setTimeout(() => {
          circle.remove();
        }, 10000);
      }, 2000);

      setCurrentInterval(interval);
    } else {
      clearInterval(currentInterval);
    }
  }, [isLoading]);

  /**
   * durationで指定した秒数でopacityが0.3→1と繰り返す
   * ロード中：真ん中の丸から1秒おきに波紋が広がるアニメーション、5秒後に消える
   * ロードが終わったらStart表示
   */

  return (
    <Container>
      <BaseCircle
        animate="loading"
        variants={basicCircleVariant}
        onClick={onClick}
        isLoading={isLoading}
        exit={"clicked"}
      >
        <CircleContainer ref={ref}></CircleContainer>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Text
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              key="loading"
            >
              Loading
            </Text>
          ) : (
            <Text
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              key="loaded"
            >
              Play
            </Text>
          )}
        </AnimatePresence>
      </BaseCircle>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled(motion.p)`
  color: #fff;
  font-size: 30px;
  font-family: serif;
  margin: 0;
`;

const BaseCircle = styled(motion.div)<{ isLoading: boolean }>`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: ${(props) => (props.isLoading ? "default" : "pointer")};

  @media only screen and (max-width: 767px) {
    width: 150px;
    height: 150px;
  }
`;

const Circle = styled(motion.div)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 1px solid #ffffff;
  position: absolute;
  top: 0;
  left: 0;

  @media only screen and (max-width: 767px) {
    width: 150px;
    height: 150px;
  }
`;

const CircleContainer = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  top: 0;

  @media only screen and (max-width: 767px) {
    width: 150px;
    height: 150px;
  }
`;
