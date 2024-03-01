import { useContext } from 'react';

import getConfig from 'next/config';
import Image from 'next/image';

import { color } from 'lib/variables';
import styled from 'styled-components';

import { TourContext, TourContextType } from './TourContext';

/**
 * Restart tour button for the index page shown if either skipped or tour was completed
 */

const { LAGOON_UI_TOURS_ENABLED } = getConfig().publicRuntimeConfig;
const tourEnabled = LAGOON_UI_TOURS_ENABLED === 'enabled';

const TourControlBtn = () => {
  let skipped,
    allRoutesToured,
    manuallyTriggerTour,
    tourStarted,
    running,
    startTour: () => void,
    continueTour: (shouldRevalidate: boolean) => void,
    allCurrentStepsTraversed;

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
        <Image alt="tour" width={35} height={35} src="/static/images/tour.svg" />
        <span className="tooltip">{toolTip}</span>
      </StyledRestartTour>
    );
  };

  // if skipped or everything was toured
  if (skipped || allRoutesToured()) {
    return renderButton(manuallyTriggerTour, 'Restart Lagoon Tour');
  }

  // current route tours already finished
  if (allCurrentStepsTraversed) return null;

  // tour was started before but paused in any of the route steps.
  if (tourStarted && !running) {
    return renderButton(() => {
      continueTour(true);
    }, 'Continue Lagoon Tour');
  }

  // tour was not started at all
  if (!tourStarted) {
    return renderButton(() => {
      startTour();
      continueTour(true);
    }, 'Start & Continue Lagoon Tour');
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
  border: 2px solid transparent;
  border-radius: 8px;

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
    background-color: ${color.lightestBlue};
    .tooltip {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export default TourControlBtn;
