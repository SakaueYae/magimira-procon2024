import { createContext, ReactNode, useRef } from "react";

type CirclesContextProviderProps = {
  children: ReactNode;
};

type CirclesContextType = {
  circles: HTMLElement[];
};

export const CirclesContext = createContext({} as CirclesContextType);

export const CirclesContextProvider = ({
  children,
}: CirclesContextProviderProps) => {
  const circles = useRef<HTMLElement[]>([]).current;
  return (
    <CirclesContext.Provider value={{ circles }}>
      {children}
    </CirclesContext.Provider>
  );
};
