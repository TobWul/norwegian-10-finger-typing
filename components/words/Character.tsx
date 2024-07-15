import { cva, cx } from "class-variance-authority";
import { type ReactElement } from "react";

export interface CharacterProps {
  character: string;
  active?: boolean;
  error?: boolean;
  complete?: boolean;
}

const characterStyles = cva("", {
  variants: {
    active: {
      true: "bg-gray-200",
      false: "",
    },
    error: {
      true: "line-through text-accent animate-wiggle bg-accent-light",
      false: "",
    },
    complete: {
      true: "text-blue-600",
      false: "",
    },
  },
});

export function Character({
  character,
  active,
  complete,
  error,
}: CharacterProps): ReactElement {
  return (
    <span
      id={active ? "active" : undefined}
      className={characterStyles({ active: active && !error, error, complete })}
    >
      {character}
    </span>
  );
}
