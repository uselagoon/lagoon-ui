import React, { useEffect } from 'react';

import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

/*
    For mocking component button functionality only:
    the decorator intercepts and overrides component level button actions instead of trying to execute a mutation

*/
const withButtonOverrides = (domQuery: string, actionType: string, actionDescription: string) => {
  return (StoryFn: StoryFn) => {
    useEffect(() => {
      const handleButtonClick = (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        // Manually trigger the action logging
        action(actionDescription)(event);
      };

      const buttons = document.querySelectorAll(domQuery);

      // Override the click event handler for each button
      buttons.forEach(button => {
        button.addEventListener(actionType, handleButtonClick);
      });

      return () => {
        // Cleanup: Remove the overridden click event handlers
        buttons.forEach(button => {
          button.removeEventListener(actionType, handleButtonClick);
        });
      };
    }, []);

    return <StoryFn />;
  };
};

export default withButtonOverrides;
