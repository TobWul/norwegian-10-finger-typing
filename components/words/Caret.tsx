import { KeyPressContext } from "@/lib/context/key-press/KeyPressContext";
import { cva } from "class-variance-authority";
import {
  useContext,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

const caretStyles = cva("inline-block w-1 h-full bg-gray-900", {
  variants: {
    isTyping: {
      true: "animate-none",
      false: "animate-caret",
    },
  },
});

// Caret that blinks
export function Caret(): ReactElement {
  const { lastPressedKey } = useContext(KeyPressContext);
  const [isTyping, setTyping] = useState(true);

  useEffect(() => {
    // Restart the animation by toggling the visibility state
    setTyping(true); // Hide the caret
    const timer = setTimeout(() => {
      setTyping(false); // Show the caret again after a short delay
    }, 400); // Delay of 0 to allow for reflow

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [lastPressedKey]); // Dependency on lastPressedKey

  return <div className={caretStyles({ isTyping })}> </div>;
}
