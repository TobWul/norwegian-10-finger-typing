import { KeyPressContext } from "@/lib/context/key-press/KeyPressContext";
import { useContext, useEffect, useState, type ReactElement } from "react";
import { HighlightDot } from "./HighlightDot";
import { Pos } from "./types";

export interface KeyboardHighlightProps {
  keyboardRef: React.RefObject<HTMLDivElement>;
}

function escapeCssSelector(value?: string) {
  return value?.replace(/([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^`{|}~])/g, "\\$1");
}

export function KeyboardHighlight({ keyboardRef }: KeyboardHighlightProps) {
  const { nextKey } = useContext(KeyPressContext);
  const [toPos, setToPos] = useState<Pos | undefined>({ x: 0, y: 0 });
  const [fromPos, setFromPos] = useState<Pos | undefined>({ x: 0, y: 0 });

  function getPos(el: Element | null | undefined): Pos | undefined {
    if (!el) return undefined;
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
      `[data-key-code=${escapeCssSelector(toKeyCode)}], [data-secondary-key-code=${escapeCssSelector(toKeyCode)}]`,
    );
    const fromKeyCode = toKey?.getAttribute("data-from-key");

    const fromKey = keyboardRef.current?.querySelector(
      `[data-key-code=${escapeCssSelector(fromKeyCode)}], [data-secondary-key-code=${escapeCssSelector(fromKeyCode)}]`,
    );

    setToPos(getPos(toKey));
    setFromPos(getPos(fromKey));
  }, [nextKey, keyboardRef]);

  if (!toPos && !fromPos) return null;

  return <HighlightDot toPos={toPos} fromPos={fromPos} />;
}
