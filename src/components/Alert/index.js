import React from "react";
import {StyledAlert, StyledAlertContent} from './StyledAlert';

export const Alert = ({
      type, header, message, closeAlert
}) => {
    const createClassName = () => {
      let className = `${type ? `${type} alert-element` : 'alert-element'}`;
      return className;
    };

    const AlertElement = 
      <StyledAlert className={createClassName()}>
        <span className="closebtn" onClick={() => closeAlert()}>
          &times;
        </span>
        <StyledAlertContent>
          <span>
            <b>{header}</b> {message}
          </span>
        </StyledAlertContent>
      </StyledAlert>

    
    
    return <>{AlertElement}</>;
}

export default Alert;