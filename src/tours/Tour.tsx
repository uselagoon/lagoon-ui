import getConfig from "next/config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Joyride, { CallBackProps } from "react-joyride";
import { useTourContext } from "./TourContext";

interface Config {
  mode: "translated" | "literal";
  routes: Route[];
}
type Route = {
  pathName: string;
  steps: Step[];
};
type Step = {
  target: string;
  title: string;
  content: string;
  disableBeacon?: boolean;
};

const { LAGOON_UI_TOURS_ENABLED } = getConfig().publicRuntimeConfig;

const Tour = () => {
  const router = useRouter();
  const { pathname } = router;

  const { running, stepIndex, setTourState } = useTourContext();
  console.warn(running, stepIndex, setTourState);

  const [localSteps, setLocalSteps] = useState<Step[]>();
  const [translated, setTranslated] = useState(false);
  const [tourRoutes, setTourRoutes] = useState<Route[]>([]);
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);

  const getTourConfig = async () => {
    const TourConfig = (await import("../../tour.json")).default;
    setTranslated(TourConfig.mode === "translated");

    setTourRoutes(TourConfig.routes);

    // index to identify the current route, the prev and next routes.
    const currentIndex = TourConfig.routes.findIndex(
      (route) => pathname === route.pathName
    );
    setCurrentRouteIndex(currentIndex);

    if (!!~currentIndex) {
      const modifiedSteps = TourConfig.routes[currentIndex].steps.map(
        (eachStep) => {
          return { ...eachStep, disableBeacon: true };
        }
      );
      setLocalSteps(modifiedSteps);
      // need to manage index of the current subroute
    }
  };

  useEffect(() => {
    getTourConfig();
  }, []);

  useEffect(() => {
    console.log(localSteps);

    setTimeout(() => {
      setTourState((prev) => {
        return { ...prev, running: true };
      });
    }, 100);
  }, [localSteps]);

  /* handle every step click:
    skip or at the very end of the very last route sets localstorage vars to true.

    next/prev first checks if they should look into the current steps or move to next/prev ROUTE



  */

  const handleCallback = (data: CallBackProps) => {
    const { action, index, lifecycle, type } = data;

    console.log(action, index, lifecycle, type);

    if (type === "step:after" && action === "prev") {
      setTourState((prev) => {
        return { ...prev, stepIndex: prev.stepIndex - 1 };
      });

      console.error("PREV");
      return;
    }

    if (type === "step:after" && index === stepIndex) {
      setTourState((prev) => {
        return { ...prev, stepIndex: prev.stepIndex + 1 };
      });
      console.error("step TEST");
      return;
    }

    if (type === "tour:end") {
      const link = {
        urlObject: {
          pathname: tourRoutes[currentRouteIndex + 1].pathName,
          query: { projectName: "drupal-example" },
        },
        asPath: `${tourRoutes[currentRouteIndex].pathName}/${"drupal-example"}`,
      };

      // if it is a sub-path and has a dynamic route slug to go to, do so, or skip the step entirely.
      // if it does not have a single project, skip to /alldeployments -> /settings

      // checks needed if there actualaly are more next route steps
      router.push(link.urlObject, link.asPath);
    } else if (type === "step:after" && index === 1) {
      if (action === "next") {

        console.error("step after INDEX 1?");
      } else {

      }
    } else if (type === "step:after" && action === "prev" && index === 2) {

      console.error("step after index 2?");


    } else if (action === "reset" || lifecycle === "complete") {

      console.error("COMPLETE");
    }
  };

  if (!LAGOON_UI_TOURS_ENABLED) return null;

  if (!localSteps) return null;

  return (
    <Joyride
      callback={handleCallback}
      run={running}
      steps={localSteps}
      stepIndex={stepIndex}
      continuous
      disableCloseOnEsc
      disableOverlayClose
      showProgress
      showSkipButton
      locale={{
        last: "Next", // it instead pushes to the next route with steps if there is any.
      }}
    />
  );
};
export default Tour;
