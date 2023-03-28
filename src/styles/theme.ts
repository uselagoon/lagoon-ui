import { color } from "lib/variables";
import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  colorScheme: "dark",
  
  backgrounds: {
    primary: "#0E1117",
    secondary: "#151922",
    tertiary: "#161b25",
    modalOverlay: "#050503",
    input: "#3B3B3B",
    sidebar: "#0E1117",
    table: "#0E1117",
    environment: "#161b25",
    box: "#151922",
  },
  texts: {
    primary: "#e5e5e5",
    label: "#dee2e5",
  },
  borders: {
    input: "#46505d",
    box: "#21262C",
  },
  highlights: {
    selection: "#f6f9ff",
  },
  gradients: {
    headerFooterGradient: "linear-gradient(to right, #24aec4 0%, #2a6dfe 25%)",
  },
};

export const lightTheme: DefaultTheme = {
  colorScheme: "light",

  backgrounds: {
    primary: color.almostWhite,
    secondary: color.white,
    tertiary: color.almostWhite,
    modalOverlay: "#fafafcbf",
    input: color.white,
    sidebar: color.lightestGrey,
    table: color.white,
    environment: color.almostWhite,
    box: color.white,
  },
  texts: {
    primary: color.black,
    label: color.darkGrey,
  },
  borders: {
    input: color.midGrey,
    box: color.lightestGrey,
  },
  highlights: {
    selection: "#497ffa4d",
  },
  gradients: {
    headerFooterGradient: `linear-gradient(to right, ${color.brightBlue} 0%,${color.lightBlue} 25%)`,
  },
};
