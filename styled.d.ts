import "styled-components";

export  interface LagoonTheme {
  colorScheme: "dark" | "light";
  backgroundColor: string;
  primaryTextColor: string;
  modalOverlayBg: string;
  labelColor: string;
  headerFooterGradient: string;
  inputBg: string;
  inputBorder:string;
  boxBorder:string;
  selectionBg: string;
}

declare module "styled-components" {
  export interface DefaultTheme extends LagoonTheme {}
}
