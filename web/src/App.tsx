import { useEffect } from "react";
import { Board } from "@/components/Board";
import { GameControls } from "@/components/GameControls";
import { useGame } from "@/hooks/useGame";

export default function App() {
  const init = useGame((s) => s.init);
  const destroy = useGame((s) => s.destroy);

  useEffect(() => {
    init();
    return () => destroy();
  }, [init, destroy]);

  return (
    <div className="min-h-dvh bg-stone-900 text-white flex flex-col items-center justify-center gap-4 py-4">
      <h1 className="text-xl font-bold tracking-wide">五子棋</h1>
      <Board />
      <GameControls />
    </div>
  );
}
