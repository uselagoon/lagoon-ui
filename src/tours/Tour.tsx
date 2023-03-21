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
    allRoutesToured
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
      setCurrentRouteTour({
        pathName: pathname,
        steps: modifiedSteps,
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
    const { action, index, lifecycle, type } = data;

    console.log(action, index, lifecycle, type);

    if (action === "skip") {
      skipTour();
    }

    if (type === "step:after" && action === "prev") {
      //   setTourState((prev) => {
      //     return { ...prev, stepIndex: prev.stepIndex - 1 };
      //   });

      console.error("PREV");
      return;
    }

    if (type === "step:after") {
      //   setTourState((prev) => {
      //     return { ...prev, stepIndex: prev.stepIndex + 1 };
      //   });
      console.error("step TEST");
      return;
    }

  if (type === "step:after" && index === 1) {
      if (action === "next") {
        console.error("step after INDEX 1?");
      } else {
      }
    }

    if (type === "tour:end") {
      console.error("COMPLETE");
      pauseTour();
      updateRoutesToured(pathname);
    }
  };

  // user opted out of the tour or every route has been toured
  if (skipped || allRoutesToured()) return null;

  // not present in json
  if (!currentRouteTour) return null;

  // already toured
  if (currentRouteTour && routesToured.includes(currentRouteTour.pathName))
    return null;

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
