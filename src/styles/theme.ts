import { color } from "lib/variables";
import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  colorScheme: "dark",
  backgroundColor: "#0E1117",
  secondaryBg: "#151922",

  primaryTextColor: "#e5e5e5",

  modalOverlayBg:"#050503",

  labelColor: "#dee2e5",
  inputBg: "#3B3B3B",
  inputBorder: "#46505d",
  boxBorder:"#21262C",
  headerFooterGradient: "linear-gradient(to right, #24aec4 0%, #2a6dfe 25%)",
  selectionBg: "#f6f9ff",
  tableBg: "#0E1117",
  boxBackground: "#151922",

  environmentBg: "#161b25",
  sidebarBg: "#0E1117",
};

export const lightTheme: DefaultTheme = {
  colorScheme: "light",
  backgroundColor: color.almostWhite,
  secondaryBg: color.white,

  primaryTextColor: color.black,
  modalOverlayBg: "#fafafcbf",
  labelColor: color.darkGrey,
  inputBg: color.white,
  inputBorder: color.midGrey,
  boxBorder:color.lightestGrey,
  headerFooterGradient: `linear-gradient(to right, ${color.brightBlue} 0%,${color.lightBlue} 25%)`,
  selectionBg: "#497ffa4d",
  tableBg: color.white,
  boxBackground: color.white,
  environmentBg: color.almostWhite,
  sidebarBg: color.lightestGrey,
};
