import { Player } from "textalive-app-api";

export type MusicTitle =
  | "SUPERHERO"
  | "いつか君と話したミライは"
  | "フューチャーノーツ"
  | "未来交響曲"
  | "リアリティ"
  | "TheMarks";

export const musicObj = {
  SUPERHERO: {
    songUrl: "https://piapro.jp/t/hZ35/20240130103028",
    lyricId: 59415,
    lyricDiffId: 13962,
    color: "rgb(255, 239, 97)",
  },
  いつか君と話したミライは: {
    songUrl: "https://piapro.jp/t/--OD/20240202150903",
    lyricId: 59416,
    lyricDiffId: 13963,
    color: "rgb(126, 87, 255)",
  },
  フューチャーノーツ: {
    songUrl: "https://piapro.jp/t/XiaI/20240201203346",
    lyricId: 59417,
    lyricDiffId: 13964,
    color: "rgb(139, 252, 245)",
  },
  未来交響曲: {
    songUrl: "https://piapro.jp/t/Rejk/20240202164429",
    lyricId: 59418,
    lyricDiffId: 13965,
    color: "rgb(250, 205, 245)",
  },
  リアリティ: {
    songUrl: "https://piapro.jp/t/ELIC/20240130010349",
    lyricId: 59419,
    lyricDiffId: 13966,
    color: "rgb(212, 255, 189)",
  },
  TheMarks: {
    songUrl: "https://piapro.jp/t/xEA7/20240202002556",
    lyricId: 59420,
    lyricDiffId: 13967,
    color: "rgb(145, 3, 3)",
  },
};

export const selectMusic = (player: Player, music: MusicTitle) => {
  player.createFromSongUrl(musicObj[music].songUrl, {
    video: {
      lyricId: musicObj[music].lyricId,
      lyricDiffId: musicObj[music].lyricDiffId,
    },
  });
};
