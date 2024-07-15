export type KeyType = {
  label: string;
  secondaryLabel?: string;
  keyCode: string;
  secondaryKeyCode?: string;
  fingerGroup: 1 | 2 | 3 | 4 | 5;
  finger: "left" | "right";
  fromKey: string;
  width?: number;
};
