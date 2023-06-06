import { ReactNode } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

import useTheme from 'lib/useTheme';

import { darkTheme, lightTheme } from './theme';

const ThemedSkeletonWrapper = ({
  children,
  baseColor,
  highlightColor,
}: {
  children: ReactNode;
  baseColor?: string;
  highlightColor?: string;
}) => {
  const cachedTheme = localStorage.getItem('theme');
  const { theme } = useTheme();

  // use localstorage first to avoid flickers if toggling theme too quickly;
  const currentTheme = cachedTheme ? cachedTheme : theme;

  const {
    skeleton: { base, highlight },
  } = currentTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <SkeletonTheme baseColor={baseColor || base} highlightColor={highlightColor || highlight}>
      {children}
    </SkeletonTheme>
  );
};

export default ThemedSkeletonWrapper;
