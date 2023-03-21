import React, { createContext, useContext, useState } from "react";
import { ReactElement } from "react";
import { Route } from "./Tour";

export interface TourContextType {
  tourStarted: boolean;
  running: boolean;
  tourRoutes: Route[];
  skipped: boolean;
  setTourState: React.Dispatch<React.SetStateAction<TourContextType>>;
  skipTour: () => void;
  routesToured: string[];
  updateRoutesToured: (newRoute: string) => void;
  startTour: () => void;
  endTour: () => void;
  continueTour: () => void;
  pauseTour: () => void;
  manuallyTriggerTour: () => void;
  allRoutesToured: () => boolean;
}

const defaultTourContextValue = {
  tourStarted: false,
  running: false,
  tourRoutes: [],
  skipped:
    typeof window !== "undefined" &&
    localStorage.getItem("lagoon_tour_skipped") === "true"
      ? true
      : false,
  setTourState: () => {},
  skipTour: () => {},
  routesToured:
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("lagoon_tour_routesToured") || "[]"),
  updateRoutesToured: () => {},
  startTour: () => {},
  endTour: () => {},
  continueTour: () => {},
  pauseTour: () => {},
  manuallyTriggerTour: () => {},
  allRoutesToured: () => false
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

  const updateRoutesToured = (newRoute: string) => {
    const routeIdx = tourState.routesToured.indexOf(newRoute);
    // update if not already in routesToured
    if (!~routeIdx) {
      const updatedRoutesToured = [...tourState.routesToured, newRoute];
      localStorage.setItem(
        "lagoon_tour_routesToured",
        JSON.stringify(updatedRoutesToured)
      );
      setTourState((prev) => {
        return {
          ...prev,
          routesToured: JSON.parse(
            localStorage.getItem("lagoon_tour_routesToured") || "[]"
          ),
        };
      });
    }
  };

  const skipTour = () => {
    localStorage.setItem("lagoon_tour_skipped", "true");
    setTourState((prev) => {
      return { ...prev, skipped: true };
    });
  };

  const startTour = () => {
    setTourState((prev) => {
      return { ...prev, tourStarted: true, running: true };
    });
  };

  const endTour = () => {
    setTourState((prev) => {
      return { ...prev, tourStarted: false, running: false };
    });
  };
  const pauseTour = () => {
    setTourState((prev) => {
      return { ...prev, running: false };
    });
  };
  const continueTour = () => {
    setTourState((prev) => {
      return { ...prev, running: true };
    });
  };

  // if tour was skipped or finished, still make it accessible
  const manuallyTriggerTour = () => {
    // reset "skipped" and "routesToured"
    localStorage.setItem("lagoon_tour_routesToured", JSON.stringify([]));
    localStorage.setItem("lagoon_tour_skipped", "false");
    setTourState((prev) => {
      return { ...prev, skipped: false, routesToured: [] };
    });
  };

  const allRoutesToured = () => tourState.tourRoutes.every((tourRoute)=> tourState.routesToured.includes(tourRoute.pathName))

  return (
    <TourContext.Provider
      value={{
        ...tourState,
        setTourState,
        skipTour,
        updateRoutesToured,
        startTour,
        endTour,
        pauseTour,
        continueTour,
        manuallyTriggerTour,
        allRoutesToured
      }}
    >
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
