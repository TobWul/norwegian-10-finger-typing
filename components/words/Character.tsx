import { cva } from "class-variance-authority";
import { type ReactElement } from "react";

export interface CharacterProps {
  character: string;
  active?: boolean;
  error?: boolean;
  complete?: boolean;
}

const characterStyles = cva("relative", {
  variants: {
    active: {
      true: "bg-gray-200",
      false: "",
    },
    error: {
      true: "line-through text-accent animate-wiggle bg-accent-light",
      false: "",
    },
    animate: {
      true: "inline-block",
      false: "",
    },
  },
});

export function Character({
  character,
  active,
  error,
}: CharacterProps): ReactElement {
  return (
    <span
      id={active ? "active" : undefined}
      className={characterStyles({
        active: active && !error,
        error,
        animate: character !== " ",
      })}
    >
      {character}
    </span>
  );
}
