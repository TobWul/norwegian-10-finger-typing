"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Key } from "./Key";
import { keys } from "./keys";
import { KeyPressContext } from "@/lib/context/key-press/KeyPressContext";
import { KeyboardHighlight } from "../highlight/KeyboardHighlight";

type KeyboardProps = {};

export const Keyboard = ({}: KeyboardProps) => {
  const { pressedKeys } = useContext(KeyPressContext);
  const keyboardRef = useRef(null);
  return (
    <>
      <KeyboardHighlight keyboardRef={keyboardRef} />
      <div ref={keyboardRef}>
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 mb-4">
            {row.map((key, index) => (
              <Key
                key={key.label + index}
                pressed={
                  (pressedKeys.includes(key.keyCode) ||
                    (key.secondaryKeyCode &&
                      pressedKeys.includes(key.secondaryKeyCode))) as boolean
                }
                {...key}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
