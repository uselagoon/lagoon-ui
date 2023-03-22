import Image from "next/image";
import styled from "styled-components";
import { useTourContext } from "./TourContext";
import { color } from "lib/variables";

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
        <span className="tooltip">Restart lagoon tour</span>
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
  position: relative;
  .tooltip{
    position: absolute;
    visibility: hidden;
    opacity: 0;
    top: -3px;
    left: 140%;
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
  &:hover{
    .tooltip{
      opacity: 1;
      visibility: visible;
    }
  }
`;

export default RestartTourButton;
