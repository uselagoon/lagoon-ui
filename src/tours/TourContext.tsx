import React, { createContext, useContext, useState } from "react";
import { ReactElement } from "react";
import { Route } from "./Tour";

export interface TourContextType {
  running: boolean;
  tourRoutes: Route[];
  skipped: boolean;
  setTourState: React.Dispatch<React.SetStateAction<TourContextType>>;
  skipTour: () => void;
  routesToured: string[];
  updateRoutesToured: (newRoute: string)=>void;
}

const defaultTourContextValue = {
  running: false,
  tourRoutes: [],
  skipped:
   typeof window !=="undefined" && localStorage.getItem("lagoon_tour_skipped") === "true" ? true : false,
  setTourState: () => {},
  skipTour: () => {},
  routesToured: typeof window !=="undefined" && JSON.parse(localStorage.getItem("lagoon_tour_routesToured") || "[]"),
  updateRoutesToured: () =>{},
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

  const skipTour = () => {
    localStorage.setItem("lagoon_tour_skipped", "true");
    setTourState((prev) => {
      return { ...prev, skipped: true };
    });

    return;
  };

  const updateRoutesToured = (newRoute: string) =>{
    const routeIdx = tourState.routesToured.indexOf(newRoute);
    // update if not already in routesToured
    if(!~routeIdx) {
      const updatedRoutesToured = [...tourState.routesToured,newRoute];
      localStorage.setItem("lagoon_tour_routesToured", JSON.stringify(updatedRoutesToured));
    }
  }

  return (
    <TourContext.Provider value={{ ...tourState, setTourState, skipTour, updateRoutesToured }}>
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
