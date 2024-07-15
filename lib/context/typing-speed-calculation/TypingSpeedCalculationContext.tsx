import {
  ReactElement,
  ReactNode,
  createContext,
  useMemo,
  useState,
} from "react";
import { useTimer } from "./utils/useTimer";

type Props = {
  timeLeft: number;
  errorRate: string;
  wordCount: number;
  addSuccess: (characterCount: number) => void;
  addError: (characterCount: number) => void;
  reset: () => void;
};

const defaultValues: Props = {
  timeLeft: 60,
  errorRate: "0%",
  wordCount: 0,
  reset: () => {},
  addSuccess: () => {},
  addError: () => {},
};

const TypingSpeedCalculationContext = createContext<Props>(defaultValues);

const TypingSpeedCalculationContextProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const { timeLeft, resetTimer } = useTimer(defaultValues.timeLeft);
  const [succesfulCharacters, setSuccesfulCharacters] = useState(0);
  const [errors, setErrors] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const errorRate = useMemo(
    () => `${((1 - errors / succesfulCharacters) * 100).toFixed(2)}%`,
    [succesfulCharacters, errors],
  );

  const addSuccess = (characterCount: number) => {
    setSuccesfulCharacters((prev) => prev + characterCount);
    setWordCount((prev) => prev + 1);
  };

  const addError = (characterCount: number) =>
    setErrors((prev) => prev + characterCount);

  const reset = () => {
    resetTimer();
    setWordCount(0);
    setErrors(0);
    setSuccesfulCharacters(0);
  };

  return (
    <TypingSpeedCalculationContext.Provider
      value={{ errorRate, timeLeft, reset, addSuccess, addError, wordCount }}
    >
      {children}
    </TypingSpeedCalculationContext.Provider>
  );
};

export { TypingSpeedCalculationContext, TypingSpeedCalculationContextProvider };
