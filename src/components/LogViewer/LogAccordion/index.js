import React, { useState, useEffect, useRef, forwardRef } from "react";
import PropTypes from "prop-types";
import {StyledLogAccordion} from "../StyledLogViewer";

const LogAccordion = forwardRef(({
  children,
  onToggle,
  header,
  className = "",
  defaultValue = false,
  metadata = "",
}, ref) => {
    const logsTopRef = useRef(null);
    const logsEndRef = useRef(null);
    const [visibility, setVisibility] = useState(defaultValue);
    const [scrollHidden, setScrollHidden] = useState(false);

    const scrollToTop = () => {
      logsTopRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToBottom = () => {
      logsEndRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    useEffect(() => {
      if (ref && ref.current) {
        if (ref.current.clientHeight < 600) {
          setScrollHidden(true);
        }
      }
    }, [ref, visibility, scrollHidden]);

    return (
        <StyledLogAccordion className={className}>
            <div className={`accordion-heading`} onClick={(e) => {
                setVisibility(!visibility);
                if (onToggle) onToggle(!visibility);
            }}>
              <div key="1" className={ "log-header" + (visibility ? " visible" : "")} >{header} {metadata.length > 0 ? "(" + metadata + ")" : ""}</div>
            </div>
            <div ref={logsTopRef} />
            {visibility ?
              <>
                {!scrollHidden &&
                  <div className="scroll-wrapper bottom">
                    <button className={`scroll bottom`} onClick={() => scrollToBottom()}>↓</button>
                  </div>
                }
                <div ref={ref}>{children}</div>
                {!scrollHidden &&
                  <div className="scroll-wrapper top">
                    <button className={`scroll top`} onClick={() => scrollToTop()}>↑</button>
                  </div>
                }
              </>
              : null}
            <div ref={logsEndRef} />
        </StyledLogAccordion>
    );
});

LogAccordion.propTypes = {
    children: PropTypes.any.isRequired,
    defaultValue: PropTypes.bool,
    className: PropTypes.string,
    onToggle: PropTypes.func,
    header: PropTypes.string,
};

export default LogAccordion;