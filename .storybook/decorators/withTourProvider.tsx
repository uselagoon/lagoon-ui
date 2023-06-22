import React from 'react';

import { TourContextProvider } from '../../src/tours/TourContext';

const withTourProvider = Story => {
  return (
    <TourContextProvider>
      <Story />
    </TourContextProvider>
  );
};

export default withTourProvider;
