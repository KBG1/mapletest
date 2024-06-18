"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CharacterStat {
  date: string | null;
  character_class: string;
  final_stat: Array<{ stat_name: string; stat_value: string | number }>;
  remain_ap: number;
}

interface CharacterStatContextType {
  characterStat: CharacterStat;
  setCharacterStat: (characterStat: CharacterStat) => void;
}

const CharacterStatContext = createContext<CharacterStatContextType | null>(null);

export const useCharacterStat = () => {
  const context = useContext(CharacterStatContext);
  if (!context) {
    throw new Error("useCharacterStat must be used within a CharacterStatProvider");
  }
  return context;
};

export const CharacterStatProvider = ({ children }: { children: ReactNode }) => {
  const [characterStat, setCharacterStat] = useState<CharacterStat>({
    date: null,
    character_class: '',
    final_stat: [],
    remain_ap: 0,
  });

  return (
    <CharacterStatContext.Provider value={{ characterStat, setCharacterStat }}>
      {children}
    </CharacterStatContext.Provider>
  );
};
