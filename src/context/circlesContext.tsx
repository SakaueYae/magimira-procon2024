import { createContext, ReactNode, Ref, useRef } from "react";

type CirclesContextProviderProps = {
  children: ReactNode;
};

type CirclesContextType = {
  circles: Ref<HTMLElement>[];
};

export const CirclesContext = createContext({} as CirclesContextType);

export const CirclesContextProvider = ({
  children,
}: CirclesContextProviderProps) => {
  const circles = useRef<Ref<HTMLElement>[]>([]).current;
  return (
    <CirclesContext.Provider value={{ circles }}>
      {children}
    </CirclesContext.Provider>
  );
};
