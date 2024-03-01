import React, { ReactNode, createContext, useContext, useState } from 'react';
import { ReactElement } from 'react';

import { Route } from './Tour';

export interface TourContextType {
  tourStarted: boolean;
  running: boolean;
  tourRoutes: Route[];
  skipped: boolean;
  setTourState: React.Dispatch<React.SetStateAction<TourContextType>>;
  skipTour: () => void;
  routesToured: { path: string; keys: string[] }[];
  updateRoutesToured: (newRoute: string, stepKey: string) => void;
  startTour: () => void;
  endTour: () => void;
  continueTour: () => void;
  pauseTour: (shouldRevalidate?: boolean) => void;
  manuallyTriggerTour: () => void;
  allRoutesToured: () => boolean;
  shouldRevalidate: boolean;
  allCurrentStepsTraversed: boolean;
  updateCurrentStepsTraversed: (allTraversed: boolean) => void;
  updateTourInfo: (
    updatedTourInfo: {
      path: string;
      keys: string[];
    }[]
  ) => void;
}

const defaultTourContextValue = {
  tourStarted: false,
  running: false,
  tourRoutes: [],
  skipped: typeof window !== 'undefined' && localStorage.getItem('lagoon_tour_skipped') === 'true' ? true : false,
  setTourState: () => {},
  skipTour: () => {},
  routesToured: typeof window !== 'undefined' && JSON.parse(localStorage.getItem('lagoon_tour_routesToured') || '[]'),
  updateRoutesToured: () => {},
  startTour: () => {},
  endTour: () => {},
  continueTour: () => {},
  pauseTour: () => {},
  manuallyTriggerTour: () => {},
  allRoutesToured: () => false,
  shouldRevalidate: false,
  allCurrentStepsTraversed: false,
  updateCurrentStepsTraversed: () => {},
  updateTourInfo: () => {},
};

export const TourContext = createContext<TourContextType | null>(null);

export const TourContextProvider = ({ children }: { children: ReactElement[] | ReactNode }) => {
  const [tourState, setTourState] = useState<TourContextType>(defaultTourContextValue);

  const updateTourInfo = (
    updatedTourInfo: {
      path: string;
      keys: string[];
    }[]
  ) => {
    localStorage.setItem('lagoon_tour_routesToured', JSON.stringify(updatedTourInfo));

    setTourState(prev => {
      return {
        ...prev,
        routesToured: updatedTourInfo,
      };
    });
  };

  const flipRevalidation = () => {
    // at the next async opportunity, flip the revalidate flag to false.
    // tour's effect hook will have already reset the steps.
    setTimeout(() => {
      setTourState(prev => {
        return { ...prev, shouldRevalidate: false };
      });
    });
  };

  const updateRoutesToured = (newRoute: string, stepKey: string) => {
    const routeIdx = tourState.routesToured.findIndex((route: { path: string; keys: string[] }) => {
      return route.path === newRoute;
    });

    // update if not already in routesToured
    if (!~routeIdx) {
      const updatedRouteInfo = {
        path: newRoute,
        keys: [stepKey],
      };
      const updatedRoutesToured = [...tourState.routesToured, { ...updatedRouteInfo }];
      updateTourInfo(updatedRoutesToured);
    } else {
      // or add a step key if not already there
      const clonedRouteState = [...tourState.routesToured];
      const foundRouteInfo = { ...tourState.routesToured[routeIdx] };

      if (!foundRouteInfo.keys.includes(stepKey)) {
        foundRouteInfo.keys = [...foundRouteInfo.keys, stepKey];
        clonedRouteState[routeIdx] = foundRouteInfo;

        updateTourInfo(clonedRouteState);
      }
    }
  };

  const skipTour = () => {
    localStorage.setItem('lagoon_tour_skipped', 'true');
    setTourState(prev => {
      return { ...prev, skipped: true };
    });
  };

  const startTour = () => {
    setTourState(prev => {
      return { ...prev, tourStarted: true, running: true };
    });
  };

  const endTour = () => {
    setTourState(prev => {
      return { ...prev, tourStarted: false, running: false };
    });
  };
  // when called by clicking "x" with shouldRevalidate, it will prepare updated yet unviewed steps when tour gets continued
  const pauseTour = (shouldRevalidate?: boolean) => {
    setTourState(prev => {
      return {
        ...prev,
        running: false,
        ...(shouldRevalidate && { shouldRevalidate }),
      };
    });

    if (shouldRevalidate) {
      flipRevalidation();
    }
  };

  const continueTour = () => {
    setTourState(prev => {
      return {
        ...prev,
        running: true,
      };
    });
  };

  const updateCurrentStepsTraversed = (allTraversed: boolean) => {
    setTourState(prev => {
      return { ...prev, allCurrentStepsTraversed: allTraversed };
    });
  };

  // if tour was skipped or finished, still make it accessible
  const manuallyTriggerTour = () => {
    // reset "skipped" and "routesToured"
    localStorage.setItem('lagoon_tour_routesToured', JSON.stringify([]));
    localStorage.setItem('lagoon_tour_skipped', 'false');
    setTourState(prev => {
      return {
        ...prev,
        skipped: false,
        routesToured: [],
        shouldRevalidate: true,
        running: true,
        tourStarted: true,
      };
    });
    flipRevalidation();
  };

  //check if all the routes with their corresponding steps have been toured
  const allRoutesToured = () => {
    const { tourRoutes, routesToured } = tourState;
    return tourRoutes.every(({ pathName, steps }) => {
      return routesToured.some(
        ({ path, keys }) => path === pathName && steps.every(({ key }) => keys.includes(key as string))
      );
    });
  };

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
        allRoutesToured,
        updateCurrentStepsTraversed,
        updateTourInfo,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTourContext = (): TourContextType => {
  const context = useContext(TourContext);

  if (!context) {
    throw new Error('Hook must be used inside TourContextProvider ');
  }
  return context;
};
