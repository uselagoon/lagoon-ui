import React, { FC } from 'react';

import { StyledBox } from './StyledBox';

/**
 * Displays a box, given an optional class name.
 */

interface BoxProps {
  className?: string;
  children: JSX.Element[] | JSX.Element;
  activeBgs?: string[]; // if present, they act as hover backgrounds
}
const Box: FC<BoxProps> = ({ className = '', activeBgs, children }) => (
  <StyledBox className={className} activeBgs={activeBgs}>
    <div className="content">{children}</div>
  </StyledBox>
);

export default Box;
