import React from 'react';

import ThemedSkeletonWrapper from '../../src/styles/ThemedSkeletonWrapper';
import { darkTheme, lightTheme } from '../../src/styles/theme';
const withLoadingSkeletons = (Story, context) => {

  const initialTheme = context.globals.theme === "" && "dark";
  const {
    //@ts-ignore
    skeleton: { base, highlight },
  } = initialTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemedSkeletonWrapper baseColor={base} highlightColor={highlight}>
      <Story />
    </ThemedSkeletonWrapper>
  );
};
export default withLoadingSkeletons;
