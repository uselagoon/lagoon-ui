import "styled-components";

export  interface LagoonTheme {
  colorScheme: "dark" | "light";
  backgroundColor: string;
  secondaryBg: string;
  primaryTextColor: string;
  modalOverlayBg: string;
  labelColor: string;
  headerFooterGradient: string;
  inputBg: string;
  inputBorder:string;
  boxBorder:string;
  selectionBg: string;
  tableBg: string;
  boxBackground: string;
  environmentBg: string;
  sidebarBg: string;
}

declare module "styled-components" {
  export interface DefaultTheme extends LagoonTheme {}
}
