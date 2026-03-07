import type { Translation } from "../types";

const ja: Translation = {
  common: {
    appTitle: "五目並べ",
    brandTitle: "五目並べ",
  },
  game: {
    difficulty: {
      easy: "かんたん",
      medium: "ふつう",
      hard: "むずかしい",
    },
    status: {
      blackWins: "黒の勝ち！",
      whiteWins: "白の勝ち！",
      draw: "引き分け！",
      yourTurnBlack: "あなたの番 — 黒",
      yourTurnWhite: "あなたの番 — 白",
    },
    controls: {
      undo: "待った",
      newGame: "新しい対局",
      start: "開始",
    },
    ai: {
      thinking: "AI 思考中",
    },
    loading: "エンジン読み込み中...",
  },
  history: {
    panel: {
      header: "対局記録",
    },
    labels: {
      won: "勝",
      lost: "負",
      draw: "平",
    },
    dates: {
      today: "今日",
      yesterday: "昨日",
    },
    moves: "手",
    back: "戻る",
  },
  gameEnd: {
    win: "あなたの勝ち！",
    lose: "あなたの負け！",
    draw: "引き分け！",
    playAgain: "もう一局",
    review: "検討",
    displayChar: {
      win: "勝",
      lose: "敗",
      draw: "和",
    },
  },
  replay: {
    step: "第 {0} / {1} 手",
  },
  footer: {
    madeWith: "Made with",
    by: "by",
    starOnGithub: "GitHub でスター",
  },
  stats: {
    title: "戦績",
  },
  settings: {
    title: "設定",
    difficulty: "難易度",
    language: "言語",
    playAs: "手番",
    playFirst: "先手 (黒)",
    playSecond: "後手 (白)",
  },
  pwa: {
    installTitle: "オフラインで遊ぶ",
    installAction: "アプリをインストール",
    iosGuide: "共有をタップして「ホーム画面に追加」を選択",
    updateAvailable: "アップデートあり",
    updateAction: "更新",
    dismiss: "後で",
  },
};

export default ja;
