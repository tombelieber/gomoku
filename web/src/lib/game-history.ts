const STORAGE_KEY = "gomoku-history";
const MAX_GAMES = 50;

export type GameRecord = {
  id: string;
  moves: { x: number; y: number; player: "black" | "white"; thinkMs?: number }[];
  winner: "black" | "white" | "draw";
  difficulty: number;
  playerColor?: "black" | "white";
  date: string;
  totalMoves: number;
};

export function loadHistory(): GameRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveGame(record: Omit<GameRecord, "id" | "date" | "totalMoves">): GameRecord {
  const history = loadHistory();
  const entry: GameRecord = {
    ...record,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    totalMoves: record.moves.length,
  };
  history.unshift(entry);
  if (history.length > MAX_GAMES) history.length = MAX_GAMES;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return entry;
}

export function deleteGame(id: string) {
  const history = loadHistory().filter((g) => g.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

export type GameStats = { wins: number; losses: number; draws: number };

export function getStats(): GameStats {
  const history = loadHistory();
  const stats: GameStats = { wins: 0, losses: 0, draws: 0 };
  for (const r of history) {
    const humanColor = r.playerColor ?? "black";
    if (r.winner === "draw") stats.draws++;
    else if (r.winner === humanColor) stats.wins++;
    else stats.losses++;
  }
  return stats;
}
