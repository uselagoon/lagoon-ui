import { color } from "lib/variables";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Joyride, { CallBackProps } from "react-joyride";
import { useTourContext } from "./TourContext";

interface Config {
  mode: "translated" | "literal";
  routes: Route[];
}
export type Route = {
  pathName: string;
  steps: Step[];
};
type Step = {
  target: string;
  title: string;
  content: string;
  disableBeacon?: boolean;
  key?: string;
};

const Tour = () => {
  const router = useRouter();
  const { pathname } = router;

  const {
    tourStarted,
    running,
    tourRoutes,
    setTourState,
    skipped,
    skipTour,
    routesToured,
    updateRoutesToured,
    pauseTour,
    allRoutesToured,
  } = useTourContext();
  const [translated, setTranslated] = useState(false);
  const [currentRouteTour, setCurrentRouteTour] = useState<Route>();

  const getCurrentRouteSteps = (routes: Route[]) => {
    const currentIndex = routes.findIndex(
      (route) => pathname === route.pathName
    );
    if (!!~currentIndex) {
      const modifiedSteps = routes[currentIndex].steps.map((eachStep) => {
        return { ...eachStep, disableBeacon: true };
      });

      // if a step was already viewed and saved locally, if the user navigates and returns, don't show it again.
      const filteredSteps = modifiedSteps.filter(
        ({ key }) =>
          !routesToured.find(({ keys }) => keys.includes(key as string))
      );

      setCurrentRouteTour({
        pathName: pathname,
        steps: filteredSteps,
      });
    }
  };

  const getTourConfig = async () => {
    const TourConfig = (await import("../../tour.json")).default;

    // save tour info to context
    setTourState((prev) => {
      return { ...prev, tourRoutes: TourConfig.routes };
    });

    // translation mode locally
    setTranslated(TourConfig.mode === "translated");

    // identify the current route and save it's steps locally
    getCurrentRouteSteps(TourConfig.routes);
  };

  // initial configuration from tour.json and set the context vals.
  useEffect(() => {
    getTourConfig();
  }, []);

  // each path change sets the joyride steps per route
  useEffect(() => {
    const handleStepsOnRouteChange = () => {
      getCurrentRouteSteps(tourRoutes);
    };

    router.events.on("routeChangeComplete", handleStepsOnRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleStepsOnRouteChange);
    };
  }, [router.events]);

  const handleCallback = (data: CallBackProps) => {
    const { action, index, type } = data;

    if (action === "skip") {
      skipTour();
      return;
    }

    if (type === "step:after" && action === "prev") {
      // actions if we need to modify what happens on back button
      return;
    }

    if (type === "step:after") {
      // update which step of the route tour was shown per step completion
      const stepKey = currentRouteTour?.steps[index].key;
      stepKey && updateRoutesToured(pathname, stepKey);

      return;
    }
    if (type === "tour:end") {
      pauseTour();
    }
  };

  // check if every step key in current route is present in the steps[] array of the currentTour
  const allCurrentRouteStepsToured = () =>
    currentRouteTour?.steps.every(({ key }) =>
      routesToured.find(
        ({ path, keys }) =>
          path === currentRouteTour.pathName && keys.includes(key as string)
      )
    ) ?? false;

  // user opted out of the tour or every route has been toured
  if (skipped || allRoutesToured()) return null;

  // not present in json
  if (!currentRouteTour) return null;

  // route already fully toured
  if (currentRouteTour && allCurrentRouteStepsToured()) return null;

  // avoid runtime errors if target isn't provided in the configuration
  if (currentRouteTour.steps.some((step) => step.target === "")) return null;

  return (
    running && (
      <Joyride
        callback={handleCallback}
        run={tourStarted && running}
        steps={currentRouteTour.steps}
        continuous
        disableCloseOnEsc
        disableOverlayClose
        showProgress
        showSkipButton
        locale={{
          skip: "Don't show again",
          last: "Complete",
        }}
        styles={{
          options: {
            primaryColor: color.blue,
          },
        }}
      />
    )
  );
};
export default Tour;
