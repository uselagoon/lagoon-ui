import "styled-components";

export  interface LagoonTheme {
  colorScheme: "dark" | "light";


  // backgroundColor: string;
  // secondaryBg: string;
  // primaryTextColor: string;
  // modalOverlayBg: string;
  // labelColor: string;
  // inputBg: string;
  // inputBorder:string;
  // boxBorder:string;
  // selectionBg: string;
  // tableBg: string;
  // boxBackground: string;
  // environmentBg: string;
  // sidebarBg: string;


  backgrounds:{
    primary:string;
    secondary: string;
    tertiary: string;
    modalOverlay: string;
    input:string;
    sidebar: string;
    environment:string;
    box: string;
    table:string;

  },
  texts:{
    primary:string;

    label:string;

  },
  highlights:{
    selection: string;
  }
  borders:{
    input:string;
    box: string;

  }
  gradients:{
    headerFooterGradient: string;
  }


}

declare module "styled-components" {
  export interface DefaultTheme extends LagoonTheme {}
}
