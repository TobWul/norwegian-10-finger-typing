"use client";
import {
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import { wordLists } from "@/lib/word-lists";
import { Character } from "./Character";
import { shuffle } from "@/lib/utils/shuffle";
import { CurrentWord } from "./CurrentWord";
import { TypingSpeedCalculationContext } from "@/lib/context/typing-speed-calculation/TypingSpeedCalculationContext";
import { getPressedKey } from "@/lib/context/key-press/utils/getPressedKey";
import { KeyPressContext } from "@/lib/context/key-press/KeyPressContext";

export interface WordsProps {
  selectedLanguage: keyof typeof wordLists;
}

// Human limit
const MAXIMUM_WORDS_PER_MINUTE = 250;

export function Words({ selectedLanguage }: WordsProps): ReactElement {
  const [completedLetters, setCompletedLetters] = useState<string[]>([]);
  const [uncompletedLetters, setUncompletedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [currentLetter, setCurrentLetter] = useState<string>("");
  const [xOffset, setXOffset] = useState(0);
  const { addSuccess, addError } = useContext(TypingSpeedCalculationContext);

  const { lastPressedKey, setNextKey } = useContext(KeyPressContext);

  useEffect(() => {
    const letters = shuffle(
      wordLists[selectedLanguage].slice(0, MAXIMUM_WORDS_PER_MINUTE),
    )
      .join(" ")
      .split("");
    const _currentLetter = letters.shift() as string;
    setUncompletedLetters(letters);
    setCurrentLetter(_currentLetter);
    setNextKey(_currentLetter);
  }, [selectedLanguage]);

  const backspace = () => {
    setWrongLetters((prev) => prev.slice(0, -1));
  };

  const typedCorrectKey = () => {
    setCompletedLetters((prev) => [...prev, currentLetter]);
    const nextLetter = uncompletedLetters[0];
    setUncompletedLetters((prev) => prev.slice(1));
    setCurrentLetter(nextLetter);
    setNextKey(nextLetter);
  };

  useEffect(() => {
    if (wrongLetters.length > 0) setNextKey("backspace");
    else setNextKey(currentLetter);
  }, [wrongLetters, currentLetter, setNextKey]);

  const typedWrongKey = (letter: string) => {
    const character = letter === " " ? "␣" : letter;
    setWrongLetters((prev) => [...prev, character]);
  };

  useEffect(() => {
    const key = getPressedKey(lastPressedKey);

    if (!key) return;
    if (key === "backspace") backspace();
    if (key.length >= 2) return;

    if (key === currentLetter && wrongLetters.length === 0) {
      typedCorrectKey();
    } else {
      typedWrongKey(key);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastPressedKey]);

  return (
    <div className="w-full text-xl relative" style={{ left: xOffset }}>
      <div className="grid grid-cols-2">
        <div className="whitespace-pre text-right flex justify-end overflow-hidden text-gray-300 w-full">
          <span className="text-gray-300">{completedLetters}</span>
        </div>
        <div className="flex whitespace-pre">
          <Character character={currentLetter} active />

          <div className="whitespace-pre text-left w-full">
            {wrongLetters.map((c, index) => (
              <Character character={c} error key={`wrong-${index}-${c}`} />
            ))}
            <span>{uncompletedLetters}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
