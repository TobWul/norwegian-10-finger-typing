import { useMemo } from "react";
import { Pos } from "./types";

export interface HighlightDotProps {
  toPos: Pos;
  fromPos: Pos;
}

export function HighlightDot({ toPos, fromPos }: HighlightDotProps) {
  const [lineLength, angle] = useMemo(() => {
    if (fromPos.x < 0 || toPos.x < 0) return [null, null];
    const y = toPos.y - fromPos.y;
    const x = toPos.x - fromPos.x;

    const lineLength = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    let angleOffset = 0;
    if (x > 0) angleOffset = Math.PI;

    const angle = Math.atan(y / x) + angleOffset;

    return [lineLength, angle];
  }, [toPos, fromPos]);

  const keyOffset = {
    x: 16,
    y: 16,
  };

  const borderOffset = {
    x: 8,
    y: 8,
  };

  return (
    <>
      <div
        id="dot"
        style={{
          top: toPos.y + keyOffset.y,
          left: toPos.x + keyOffset.x,
        }}
        className="absolute z-10 w-16 h-16 flex align-center justify-center border border-accent rounded-full"
      >
        <div className="bg-accent w-[10px] h-[10px] rounded-full relative top-[2px]"></div>
      </div>
      {!!lineLength && !!angle && (
        <div
          id="line"
          style={{
            width: lineLength,
            transform: `rotate(${angle}rad)`,
            top: toPos.y + keyOffset.y + borderOffset.y,
            left: toPos.x + keyOffset.x + borderOffset.x,
          }}
          className="absolute z-10 h-0 border-accent border border-dashed origin-left origin-bottom"
        />
      )}
    </>
  );
}
