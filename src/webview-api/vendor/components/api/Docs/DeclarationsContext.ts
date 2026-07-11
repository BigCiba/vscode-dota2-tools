import { createContext } from "react";
import type { Declaration } from "./api";

export type DeclarationsContextType = {
  root: string;
  declarations: Declaration[];
};

export const DeclarationsContext = createContext<DeclarationsContextType>({ root: "", declarations: [] });
