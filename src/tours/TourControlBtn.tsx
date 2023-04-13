import Image from "next/image";
import styled from "styled-components";
import { TourContext, TourContextType } from "./TourContext";
import { color } from "lib/variables";
import { useContext } from "react";
import getConfig from "next/config";
import useTranslation from "lib/useTranslation";

/**
 * Restart tour button for the index page shown if either skipped or tour was completed
 */

const { LAGOON_UI_TOURS_ENABLED } = getConfig().publicRuntimeConfig;
const tourEnabled = LAGOON_UI_TOURS_ENABLED === "enabled";

const TourControlBtn = () => {
  let skipped,
    allRoutesToured,
    manuallyTriggerTour,
    tourStarted,
    running,
    startTour: () => void,
    continueTour: (shouldRevalidate: boolean) => void,
    allCurrentStepsTraversed;

  const t = useTranslation();
  // if used in the header it needs to "wait" until initialization;
  const tourContext = useContext<TourContextType | null>(TourContext);
  if (!tourContext) {
    return null;
  }
  // destructure here
  ({
    skipped,
    allRoutesToured,
    manuallyTriggerTour,
    tourStarted,
    running,
    startTour,
    continueTour,
    allCurrentStepsTraversed,
  } = tourContext);

  // disabled by env var
  if (!tourEnabled) return null;

  const renderButton = (clickHandler: () => void, toolTip: string) => {
    return (
      <StyledRestartTour onClick={clickHandler}>
        <Image
          src="/static/images/tour.svg"
          alt="tour"
          width={24}
          height={24}
        />
        <span className="tooltip">{toolTip}</span>
      </StyledRestartTour>
    );
  };

  // if skipped or everything was toured
  if (skipped || allRoutesToured()) {
    return renderButton(manuallyTriggerTour, t("tours.restartTour"));
  }

  // current route tours already finished
  if (allCurrentStepsTraversed) return null;

  // tour was started before but paused in any of the route steps.
  if (tourStarted && !running) {
    return renderButton(() => {
      continueTour(true);
    }, t("tours.continueTour"));
  }

  // tour was not started at all
  if (!tourStarted) {
    return renderButton(() => {
      startTour();
      continueTour(true);
    }, t("tours.startContinue"));
  }

  return null;
};

const StyledRestartTour = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  user-select: none;
  margin-left: auto;
  margin-right: 16px;
  align-self: center;
  align-items: center;
  padding: 6px;
  height: max-content;

  .tooltip {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    top: 105%;
    left: -150%;
    color: ${color.almostWhite};
    background-color: ${color.black};
    padding-inline: 0.5rem;
    height: 32px;
    border-radius: 0.5rem;
    width: max-content;
    font-size: 1rem;
    line-height: 1rem;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
  }
  &:hover {
    .tooltip {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export default TourControlBtn;
