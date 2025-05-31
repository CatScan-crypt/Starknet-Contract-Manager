import React, { createContext, useContext } from "react";
import { useERC20Form } from "../hooks/useERC20Form";

// The context type is whatever useERC20Form returns
const ERC20FormContext = createContext<ReturnType<typeof useERC20Form> | undefined>(undefined);

export const ERC20FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const form = useERC20Form();
  return <ERC20FormContext.Provider value={form}>{children}</ERC20FormContext.Provider>;
};

export const useERC20FormContext = () => {
  const ctx = useContext(ERC20FormContext);
  if (!ctx) throw new Error("useERC20FormContext must be used within ERC20FormProvider");
  return ctx;
};