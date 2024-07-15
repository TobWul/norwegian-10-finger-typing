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
import { CurrentWord } from "./CurrentWord.1";
import { TypingSpeedCalculationContext } from "@/lib/context/typing-speed-calculation/TypingSpeedCalculationContext";

export interface WordsProps {
  selectedLanguage: keyof typeof wordLists;
}

export function Words({ selectedLanguage }: WordsProps): ReactElement {
  const { addSuccess } = useContext(TypingSpeedCalculationContext);
  const words = useMemo(() => {
    const maxWPM = 200;
    return shuffle(wordLists[selectedLanguage].slice(0, maxWPM)).join(" ");
  }, [selectedLanguage]);

  const completeWord = (word: string) => {
    setCompletedWords((prev) => `${prev} ${word}`);
    const _uncompletedWords = uncompletedWords.split(" ");
    const newWord = _uncompletedWords.shift();
    if (!newWord) {
      alert("Out of words");
      return;
    }
    setUncompletedWords(_uncompletedWords.join(" "));
    setCurrentWord(newWord);
    addSuccess(word.length);
  };

  const getInitialCenterPosition = () => {};

  useEffect(() => {
    completeWord("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [completedWords, setCompletedWords] = useState<string>("");
  const [uncompletedWords, setUncompletedWords] = useState<string>(words);
  const [currentWord, setCurrentWord] = useState<string>("heia");

  const [xOffset, setXOffset] = useState(0);

  return (
    <div className="w-full text-xl relative" style={{ left: xOffset }}>
      <div className="grid grid-cols-2 gap-4">
        <div className="whitespace-nowrap text-right flex justify-end overflow-hidden text-gray-300 w-full">
          <div>
            {completedWords
              .split("")
              .map((character: string, index: number) => (
                <Character
                  character={character}
                  key={`completed-character-${character}-${index}`}
                />
              ))}
          </div>
        </div>
        <div className="flex">
          <CurrentWord
            currentWord={currentWord}
            completeWord={completeWord}
            setXOffset={setXOffset}
          />
          <div className="whitespace-nowrap text-left w-full">
            {uncompletedWords
              .split("")
              .map((character: string, index: number) => (
                <Character
                  character={character}
                  key={`uncomplete-character-${character}-${index}`}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
