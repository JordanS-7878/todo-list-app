import { createContext, useContext } from "react";

export const DrawerContext = createContext(null);

export function useDrawer() {
  return useContext(DrawerContext);
}