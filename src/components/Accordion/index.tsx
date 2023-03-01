import React, { useState, Fragment, FC } from "react";
import { StyledAccordion } from "./StyledAccordion";

interface AccordionProps {
  children: JSX.Element[];
  defaultValue?: boolean;
  minified?: boolean;
  className?: string;
  onToggle?: (visibility: boolean) => void;
  columns?: { [key: string]: string } | string[];
}

const Accordion: FC<AccordionProps> = ({
  children,
  defaultValue = true,
  minified = false,
  className = "",
  onToggle,
  columns,
}) => {
  const [visibility, setVisibility] = useState(defaultValue);
  const accordionType = minified ? "minified" : "wide";
  const colCountClass = columns && "cols-" + Object.keys(columns).length;

  return (
    <StyledAccordion className={className}>
      <div
        className={`accordion-heading ${accordionType} ${colCountClass}`}
        onClick={() => {
          setVisibility(!visibility);
          if (onToggle) onToggle(!visibility);
        }}
      >
        {columns &&
          Object.keys(columns).map((item, i) => (
            <div key={i} className={item}>
              {columns[item]}
            </div>
          ))}
      </div>

      {visibility ? <Fragment>{children}</Fragment> : null}
    </StyledAccordion>
  );
};

export default Accordion;
