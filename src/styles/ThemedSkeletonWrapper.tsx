import { ReactNode } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

import useTheme from 'lib/useTheme';

import { darkTheme, lightTheme } from './theme';

const ThemedSkeletonWrapper = ({ children }: { children: ReactNode }) => {
  const cachedTheme = localStorage.getItem('theme');
  const { theme } = useTheme();

  // use localstorage first to avoid flickers if toggling theme too quickly;
  const currentTheme = cachedTheme ? cachedTheme : theme;

  const {
    skeleton: { base, highlight },
  } = currentTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <SkeletonTheme baseColor={base} highlightColor={highlight}>
      {children}
    </SkeletonTheme>
  );
};

export default ThemedSkeletonWrapper;
