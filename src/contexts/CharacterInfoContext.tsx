"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CharacterInfo {
  date?: string;
  character_name?: string;
  world_name?: string;
  character_gender?: string;
  character_class?: string;
  character_class_level?: number;
  character_level?: number;
  character_exp?: number;
  character_exp_rate?: number;
  character_guild_name?: string;
  character_image?: string;
  character_date_create?: string;
  access_flag?: boolean;
  liberation_quest_clear_flag?: boolean;
}

interface CharacterInfoContextType {
  characterInfo: CharacterInfo;
  setCharacterInfo: (characterInfo: CharacterInfo) => void;
}

const CharacterInfoContext = createContext<CharacterInfoContextType | null>(null);

export const useCharacterInfo = () => {
  const context = useContext(CharacterInfoContext);
  if (!context) {
    throw new Error("useCharacterInfo must be used within a CharacterInfoProvider");
  }
  return context;
};

export const CharacterInfoProvider = ({ children }: { children: ReactNode }) => {
  const [characterInfo, setCharacterInfo] = useState<CharacterInfo>({});

  return (
    <CharacterInfoContext.Provider value={{ characterInfo, setCharacterInfo }}>
      {children}
    </CharacterInfoContext.Provider>
  );
};
