import { KeyPressContext } from "@/lib/context/key-press/KeyPressContext";
import { useContext, useEffect, useState, type ReactElement } from "react";
import { HighlightDot } from "./HighlightDot";
import { Pos } from "./types";

export interface KeyboardHighlightProps {
  keyboardRef: React.RefObject<HTMLDivElement>;
}

export function KeyboardHighlight({ keyboardRef }: KeyboardHighlightProps) {
  const { nextKey } = useContext(KeyPressContext);
  const [toPos, setToPos] = useState<Pos>({ x: 0, y: 0 });
  const [fromPos, setFromPos] = useState<Pos>({ x: 0, y: 0 });

  function getPos(el: Element | null | undefined): Pos {
    if (!el) return { y: 0, x: 0 };
    const key = el.getBoundingClientRect();
    return {
      y: key.top + window.scrollY,
      x: key.left + window.scrollX,
    };
  }

  useEffect(() => {
    if (!nextKey) return;
    let toKeyCode = nextKey;
    if (nextKey === " ") toKeyCode = "space";

    const toKey = keyboardRef.current?.querySelector(
      `[data-key-code=${toKeyCode}], [data-secondary-key-code=${toKeyCode}]`,
    );
    const fromKeyCode = toKey?.getAttribute("data-from-key");

    const fromKey = keyboardRef.current?.querySelector(
      `[data-key-code=${fromKeyCode}], [data-secondary-key-code=${fromKeyCode}]`,
    );

    setToPos(getPos(toKey));
    setFromPos(getPos(fromKey));
  }, [nextKey, keyboardRef]);

  if (!toPos && !fromPos) return null;

  return <HighlightDot toPos={toPos} fromPos={fromPos} />;
}
