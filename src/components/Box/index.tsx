import React, { FC } from "react";
import { StyledBox } from "./StyledBox";

/**
 * Displays a box, given an optional class name.
 */

interface BoxProps {
  className?: string;
  children: JSX.Element[];
}
const Box: FC<BoxProps> = ({ className = "", children }) => (
  <StyledBox className={className}>
    <div className="content">{children}</div>
  </StyledBox>
);

export default Box;
