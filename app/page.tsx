"use client";
import { HighlightDot } from "@/components/highlight/HighlightDot";
import { KeyboardHighlight } from "@/components/highlight/KeyboardHighlight";
import { Keyboard } from "@/components/keyboard/Keyboard";
import { Stats } from "@/components/stats/Stats";
import { Words } from "@/components/words/Words";
import { KeyPressContextProvider } from "@/lib/context/key-press/KeyPressContext";
import { TypingSpeedCalculationContextProvider } from "@/lib/context/typing-speed-calculation/TypingSpeedCalculationContext";

export default function Home() {
  return (
    <KeyPressContextProvider>
      <TypingSpeedCalculationContextProvider>
        <div className="flex flex-col gap-24 items-center justify-center h-screen">
          <Stats />
          <div className="w-full flex justify-left p-24">
            <Words selectedLanguage="norwegian" />
          </div>
          <Keyboard />
        </div>
      </TypingSpeedCalculationContextProvider>
    </KeyPressContextProvider>
  );
}
