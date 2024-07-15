import {
  ReactElement,
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { getPressedKey } from "./utils/getPressedKey";

type Props = {
  pressedKeys: string[];
  nextKey?: string;
  lastPressedKey?: KeyboardEvent;
  setNextKey: Dispatch<SetStateAction<string | undefined>>;
};

const KeyPressContext = createContext<Props>({
  pressedKeys: [],
  nextKey: undefined,
  lastPressedKey: undefined,
  setNextKey: () => {},
});

function KeyPressContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [lastPressedKey, setLastPressedKey] = useState<KeyboardEvent>();
  const [nextKey, setNextKey] = useState<string>();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const pressedKey = getPressedKey(e);
      if (!pressedKey) return;
      setPressedKeys((prev) => {
        if (!prev.includes(pressedKey)) return [...prev, pressedKey];
        return prev;
      });
      setLastPressedKey(e);
    };

    const handleKeyRelease = (e: KeyboardEvent) => {
      const pressedKey = getPressedKey(e);
      setPressedKeys((prev) => prev.filter((key) => key !== pressedKey));
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyRelease);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyRelease);
    };
  }, []);

  return (
    <KeyPressContext.Provider
      value={{ pressedKeys, lastPressedKey, nextKey, setNextKey }}
    >
      {children}
    </KeyPressContext.Provider>
  );
}

export { KeyPressContext, KeyPressContextProvider };
