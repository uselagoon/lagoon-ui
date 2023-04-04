import { SkeletonTheme } from "react-loading-skeleton";
import { lightTheme, darkTheme } from "./theme";
import { ReactNode } from "react";
import useTheme from "lib/useTheme";

const ThemedSkeletonWrapper = ({ children }: { children: ReactNode }) => {
  const cachedTheme = localStorage.getItem("theme");
  const { theme } = useTheme();

  // use localstorage first to avoid flickers if toggling theme too much;
  const currentTheme = cachedTheme ? cachedTheme : theme;

  const {
    skeleton: { base, highlight },
  } = currentTheme === "dark" ? darkTheme : lightTheme;

  return (
    <SkeletonTheme baseColor={base} highlightColor={highlight}>
      {children}
    </SkeletonTheme>
  );
};

export default ThemedSkeletonWrapper;
