import React, { FC } from "react";

/**
 * Displays a box, given an optional class name.
 */

interface BoxProps {
  className?: string;
  children: JSX.Element[];
}
const Box: FC<BoxProps> = ({ className = "", children }) => (
  <div className={className}>
    <div className={`content ${className}`}>{children}</div>
  </div>
);

export default Box;
