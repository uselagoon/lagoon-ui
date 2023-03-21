import Image from "next/image";
import styled from "styled-components";
import { useTourContext } from "./TourContext";

/**
 * Restart tour button for the index page shown if either skipped or tour was completed
 */

const RestartTourButton = () => {
  const { skipped, allRoutesToured, manuallyTriggerTour } = useTourContext();

  if (skipped || allRoutesToured()) {
    return (
      <StyledRestartTour onClick={manuallyTriggerTour}>
        <Image
          src="/static/images/tour.svg"
          alt="tour"
          width={24}
          height={24}
        />
      </StyledRestartTour>
    );
  }
  return null;
};

const StyledRestartTour = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default RestartTourButton;
