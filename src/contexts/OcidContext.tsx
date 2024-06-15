"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface OcidContextType {
  ocid: string;
  setOcid: (ocid: string) => void;
}

const OcidContext = createContext<OcidContextType | undefined>(undefined);

export const useOcid = () => {
  const context = useContext(OcidContext);
  if (!context) {
    throw new Error("useOcid must be used within an OcidProvider");
  }
  return context;
};

export const OcidProvider = ({ children }: { children: ReactNode }) => {
  const [ocid, setOcid] = useState<string>("");

  return (
    <OcidContext.Provider value={{ ocid, setOcid }}>
      {children}
    </OcidContext.Provider>
  );
};
