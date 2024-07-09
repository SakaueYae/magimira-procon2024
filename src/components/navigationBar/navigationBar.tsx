import { motion } from "framer-motion";
import styled from "styled-components";
import { MusicTitle } from "../hooks/selectMusic";
import { useState } from "react";
import { HamburgerIcon } from "./hamburgerIcon";
import { MusicTitleItem } from "./musicTitleItem";

type NavigationBarProps = {
  selectedMusic: MusicTitle;
  onIconClick: () => void;
  onMusicClick: (music: MusicTitle) => void;
};

export const NavigationBar = ({
  selectedMusic,
  onIconClick,
  onMusicClick,
}: NavigationBarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const variants = {
    closed: {
      x: "100%",
      display: "none",
      backgroundColor: "rgba(255, 255, 255, 0)",
      transition: {
        duration: 0.5,
        y: { stiffness: 1000 },
      },
    },
    open: {
      x: 0,
      display: "block",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transition: {
        duration: 0.5,
        y: { stiffness: 1000 },
      },
    },
  };
  return (
    <Container initial={false} animate={isOpen ? "open" : "closed"}>
      <HamburgerIcon
        onClick={() => {
          setIsOpen(!isOpen);
          onIconClick();
        }}
      />
      <MusicTitleContainer variants={variants}>
        <MusicTitleItem
          title="SUPERHERO"
          isSelected={selectedMusic === "SUPERHERO"}
          color="rgb(255, 239, 97)"
          onClick={() => {
            setIsOpen(false);
            onMusicClick("SUPERHERO");
          }}
        />
        <MusicTitleItem
          title="いつか君と話したミライは"
          isSelected={selectedMusic === "いつか君と話したミライは"}
          color="rgb(126, 87, 255)"
          onClick={() => {
            setIsOpen(false);
            onMusicClick("いつか君と話したミライは");
          }}
        />
        <MusicTitleItem
          title="フューチャーノーツ"
          isSelected={selectedMusic === "フューチャーノーツ"}
          color="rgb(139, 252, 245)"
          onClick={() => {
            setIsOpen(false);
            onMusicClick("フューチャーノーツ");
          }}
        />
        <MusicTitleItem
          title="未来交響曲"
          isSelected={selectedMusic === "未来交響曲"}
          color="rgb(250, 205, 245)"
          onClick={() => {
            setIsOpen(false);
            onMusicClick("未来交響曲");
          }}
        />
        <MusicTitleItem
          title="リアリティ"
          isSelected={selectedMusic === "リアリティ"}
          color="rgb(212, 255, 189)"
          onClick={() => {
            setIsOpen(false);
            onMusicClick("リアリティ");
          }}
        />
        <MusicTitleItem
          title="The Marks"
          isSelected={selectedMusic === "TheMarks"}
          color="rgb(145, 3, 3)"
          onClick={() => {
            setIsOpen(false);
            onMusicClick("TheMarks");
          }}
        />
      </MusicTitleContainer>
    </Container>
  );
};

const Container = styled(motion.nav)`
  width: 30vw;
  height: 100vh;
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MusicTitleContainer = styled(motion.ul)`
  padding: 20px;
  padding-top: 120px;
  height: 100vh;
  margin: 0;
`;
