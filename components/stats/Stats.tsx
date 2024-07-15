import { TypingSpeedCalculationContext } from "@/lib/context/typing-speed-calculation/TypingSpeedCalculationContext";
import React, { ReactElement, useContext } from "react";

export function Stats(): ReactElement {
  const { timeLeft, wordCount, errorRate, reset } = useContext(
    TypingSpeedCalculationContext,
  );
  return (
    <div className="flex gap-16 text-5xl font-mono text-gray-400">
      <div className="">{timeLeft}s</div>
      <div>{errorRate}</div>
      <div>{(wordCount / ((60 - timeLeft) / 60)).toFixed(1)}</div>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
}
