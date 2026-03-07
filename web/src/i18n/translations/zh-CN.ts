import type { Translation } from "../types";

const zhCN: Translation = {
  common: {
    appTitle: "GOMOKU",
    brandTitle: "五子棋",
  },
  game: {
    difficulty: {
      easy: "简单",
      medium: "中等",
      hard: "困难",
    },
    status: {
      blackWins: "黑棋胜！",
      whiteWins: "白棋胜！",
      draw: "平局！",
      yourTurnBlack: "你的回合 — 黑棋",
      yourTurnWhite: "你的回合 — 白棋",
    },
    controls: {
      undo: "悔棋",
      newGame: "新局",
      start: "开始",
    },
    ai: {
      thinking: "AI 思考中",
    },
    loading: "加载引擎中...",
  },
  history: {
    panel: {
      header: "游戏记录",
    },
    labels: {
      won: "赢",
      lost: "输",
      draw: "平",
    },
    dates: {
      today: "今天",
      yesterday: "昨天",
    },
    moves: "步",
    back: "返回",
  },
  gameEnd: {
    win: "你赢了！",
    lose: "你输了！",
    draw: "平局！",
    playAgain: "再来一局",
    review: "复盘",
    displayChar: {
      win: "胜",
      lose: "败",
      draw: "和",
    },
  },
  replay: {
    step: "第 {0} / {1} 手",
  },
  footer: {
    madeWith: "用心制作",
    by: "by",
    starOnGithub: "在 GitHub 上加星",
  },
  stats: {
    title: "胜败记录",
  },
  settings: {
    title: "设置",
    difficulty: "难度",
    language: "语言",
    playAs: "执棋",
    playFirst: "先手 (黑)",
    playSecond: "后手 (白)",
  },
  pwa: {
    installTitle: "离线游玩",
    installAction: "安装应用",
    iosGuide: "点击分享，然后选择「添加到主屏幕」",
    updateAvailable: "有新版本",
    updateAction: "刷新",
    dismiss: "暂不",
    installed: "已安装",
    iosStep1: "点击",
    iosStep2: "滑动并点击",
    iosHomeScreen: "添加到主屏幕",
    iosStep3: "点击",
    iosAdd: "添加",
  },
};

export default zhCN;
