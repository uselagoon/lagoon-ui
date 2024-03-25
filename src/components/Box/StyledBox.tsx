import { color } from 'lib/variables';
import styled, { css } from 'styled-components';

export const StyledBox = styled.div<{ $activeBgs?: string[] }>`
  border: 2px solid ${props => props.theme.borders.box};
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  border-radius: 3px;
  position: relative;
  width: 100%;

  &::after {
    bottom: 4px;
    content: '';
    display: block;
    height: 20px;
    left: 15px;
    position: absolute;
    transition: box-shadow 0.5s ease;
    width: calc(100% - 30px);
  }

  &:hover {
    border: 2px solid ${color.brightBlue};

    &::after {
      box-shadow: 0px 12px 40px 0px rgba(73, 127, 250, 0.5);
    }
  }

  .content {
    background: ${props => props.theme.backgrounds.box};
    height: 100%;
    overflow: hidden;
    padding: 16px 20px;
    position: relative;
    transition: background-image 0.5s ease-in-out;
    z-index: 10;
  }
  ${props =>
    props.$activeBgs &&
    css`
      .content {
        background-image: ${props.$activeBgs[0]};

        &:hover {
          background-image: ${props.$activeBgs[1]};
        }
      }
    `}
`;
