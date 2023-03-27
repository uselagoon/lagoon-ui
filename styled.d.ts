import "styled-components";

declare module "styled-components" {
  export type LagoonTheme = {
    colorScheme: "dark" | "light";
    backgroundColor: string;
    primaryTextColor: string;
    modalOverlayBg: string;
    labelColor: string;
    headerFooterGradient: string;
    inputBg: string;
  };
}
