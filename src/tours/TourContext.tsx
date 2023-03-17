import React, { createContext, useContext, useState } from "react";
import { ReactElement } from "react";

export interface TourContextType {
  running: boolean;
  stepIndex: number;
  setTourState: React.Dispatch<React.SetStateAction<TourContextType>>;
}

const defaultTourContextValue = {
  running: false,
  stepIndex: 0,
  setTourState: () => {},
};

export const TourContext = createContext<TourContextType | null>(null);

export const TourContextProvider = ({
  children,
}: {
  children: ReactElement[];
}) => {
  const [tourState, setTourState] = useState<TourContextType>(
    defaultTourContextValue
  );

  return (
    <TourContext.Provider value={{ ...tourState, setTourState }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTourContext = (): TourContextType => {
  const context = useContext(TourContext);

  if (!context) {
    throw new Error("Hook must be used inside TourContextProvider ");
  }
  return context;
};
