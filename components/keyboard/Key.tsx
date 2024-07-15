import { KeyType } from "@/lib/types/key";
import { VariantProps, cva } from "class-variance-authority";

const keyStyles = cva(
  "h-64 flex font-mono p-8 rounded-lg transition-transform",
  {
    variants: {
      pressed: {
        true: "shadow-pressed",
        false: "shadow-elevated",
      },
      width: {
        1: "w-64",
        1.25: `w-80`,
        1.5: `w-96`,
        1.75: `w-112`,
        2: "w-128",
        3: "w-192",
        10: "w-[30.3125000001rem]",
      },
      finger: {
        left: "left [&+.right]:ml-48",
        right: "right",
      },
      fingerGroup: {
        1: "bg-finger-1",
        2: "bg-finger-2",
        3: "bg-finger-3",
        4: "bg-finger-4",
        5: "bg-finger-5",
      },
      multiLabel: {
        true: "text-sm flex-col justify-between",
        false: "text-md",
      },
      modifierKey: {
        true: "text-xs",
        false: "uppercase",
      },
    },
    defaultVariants: {
      width: 1,
      pressed: false,
    },
  },
);

export function Key({
  label,
  secondaryLabel,
  keyCode,
  secondaryKeyCode,
  fromKey,
  width,
  pressed,
  finger,
  fingerGroup,
}: KeyType & {
  pressed: boolean;
}) {
  return (
    <div
      className={keyStyles({
        pressed,
        width: width as any,
        finger,
        fingerGroup,
        multiLabel: Boolean(secondaryLabel),
        modifierKey: label.length > 2,
      })}
      data-key-code={keyCode}
      data-secondary-key-code={secondaryKeyCode}
      data-from-key={fromKey}
    >
      {secondaryLabel && (
        <span className="text-grey-800">{secondaryLabel}</span>
      )}
      <span>{label}</span>
    </div>
  );
}
