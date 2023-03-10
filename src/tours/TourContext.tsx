import React, { createContext, useState } from "react";
import { ReactElement } from "react-markdown";

interface ContextValueType {
  running: boolean;
  stepIndex: number;
}

const defaultTourContextValue = {
  running: false,
  stepIndex: 0,
};

export const TourContext = createContext<
  | ({
      setTourState: React.Dispatch<React.SetStateAction<ContextValueType>>;
    } & ContextValueType)
  | null
>(null);

export const TourContextProvider = ({
  children,
}: {
  children: ReactElement[];
}) => {
  const [tourState, setTourState] = useState<ContextValueType>(
    defaultTourContextValue
  );

  return (
    <TourContext.Provider value={{ ...tourState, setTourState }}>
      {children}
    </TourContext.Provider>
  );
};
