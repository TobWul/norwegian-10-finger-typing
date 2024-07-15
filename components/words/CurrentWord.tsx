import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { KeyPressContext } from "@/lib/context/key-press/KeyPressContext";
import { TypingSpeedCalculationContext } from "@/lib/context/typing-speed-calculation/TypingSpeedCalculationContext";
import { Character } from "./Character";
import { getPressedKey } from "@/lib/context/key-press/utils/getPressedKey";

export interface CurrentWordProps {
  currentWord: string;
  completeWord: (word: string) => void;
  setXOffset: Dispatch<SetStateAction<number>>;
}

type TypedCharacterType = {
  character: string;
  error: boolean;
  completed: boolean;
};

export function CurrentWord({
  currentWord,
  setXOffset,
  completeWord,
}: CurrentWordProps): ReactElement {
  const [typedCharacters, setTypedCharacters] = useState<TypedCharacterType[]>(
    [],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const { lastPressedKey, setNextKey } = useContext(KeyPressContext);
  const { addError } = useContext(TypingSpeedCalculationContext);
  const currentWordElement = useRef(null);

  useEffect(() => {
    setTypedCharacters(
      currentWord.split("").map(
        (c): TypedCharacterType => ({
          character: c,
          error: false,
          completed: false,
        }),
      ),
    );
    setCurrentIndex(0);
  }, [currentWord, setXOffset]);

  const addXOffsetOfCurrentCharacter = (offsetModifier: 0 | 1 | -1 = 1) => {
    const currentCharacterElement =
      currentWordElement.current.querySelector("#active");

    const characterWidthInPx = currentCharacterElement.offsetWidth;
    if (offsetModifier === 0) {
      setXOffset(0);
    } else {
      setXOffset((prev) => prev - characterWidthInPx * offsetModifier);
    }
  };

  /**
   * Moves cursor 1 to the left and removes character if it's an error
   */
  const backspace = () => {
    setTypedCharacters((prevTypedCharacters) =>
      prevTypedCharacters
        // The filter removes errors if it's at the current index
        .filter((c, i) => {
          // Keep characters not at current index regardless of error
          if (i !== currentIndex) return true;
          // Delete character if it's an error
          return !c.error;
        })
        // Remove the completed if current index is less than the characters index
        .map((c, i) => ({
          ...c,
          completed: i < currentIndex - 1 ? c.completed : false,
        })),
    );
    // Move the cursor 1 to the left
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    currentIndex > 0 && addXOffsetOfCurrentCharacter(-1);
    // Moves the offset a characters width to the right
  };

  /**
   * Goes to next index, or completes word if no more characters in word.
   */
  const typedCorrectKey = () => {
    setTypedCharacters([
      ...typedCharacters.map((c, i) =>
        i === currentIndex ? { ...c, completed: true } : c,
      ),
    ]);
    setCurrentIndex((prev) => prev + 1);
    addXOffsetOfCurrentCharacter();
  };

  /**
   * Inserts wrongly typed character at current index
   */
  const typedWrongKey = (key: string) => {
    setTypedCharacters((prevTypedCharacters) => {
      key = key === " " ? "⎵" : key;
      return [
        ...prevTypedCharacters.slice(0, currentIndex + 1),
        { character: key, error: true, completed: false },
        ...prevTypedCharacters.slice(currentIndex + 1),
      ];
    });
    addError(1);
    setCurrentIndex((prev) => prev + 1);
    addXOffsetOfCurrentCharacter();
  };

  useEffect(() => {
    const key = getPressedKey(lastPressedKey);
    const currentCharacter = typedCharacters[currentIndex];

    if (!key) return;
    if (key === "backspace") backspace();
    if (key.length >= 2) return;

    // Done with the word, expect space
    if (!currentCharacter) {
      if (key === " ") {
        completeWord(typedCharacters.map((c) => c.character).join(""));
        addXOffsetOfCurrentCharacter(0);
      } else {
        typedWrongKey(key);
      }
      return;
    }
    if (
      key === currentCharacter.character &&
      !typedCharacters.some((c) => c.error)
    ) {
      typedCorrectKey();
    } else {
      typedWrongKey(key);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastPressedKey]);

  // Set next key for highlight dot
  useEffect(() => {
    const nextCharacter = typedCharacters[currentIndex];
    if (typedCharacters.some((c) => c.error)) {
      setNextKey("backspace");
    } else if (!nextCharacter) {
      setNextKey("space");
    } else {
      setNextKey(nextCharacter?.character);
    }
  }, [currentWord, setNextKey, typedCharacters, currentIndex]);

  return (
    <>
      <div className="absolute -top-48 right-16">{currentIndex}</div>
      <div className="flex" ref={currentWordElement}>
        {typedCharacters.map(
          ({ character, error, completed }, index: number) => (
            <Character
              character={character}
              active={index === currentIndex}
              error={error}
              complete={completed}
              key={`current-character-${index}`}
            />
          ),
        )}
        <Character character="&nbsp;" active={!typedCharacters[currentIndex]} />
      </div>
    </>
  );
}
