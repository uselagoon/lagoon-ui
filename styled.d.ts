import 'styled-components';

export interface LagoonTheme {
  colorScheme: 'dark' | 'light';

  backgrounds: {
    primary: string;
    secondary: string;
    tertiary: string;
    modalOverlay: string;
    input: string;
    sidebar: string;
    box: string;
    table: string;
    tableLight: string;
    breadCrumbs: string;
    breadCrumb: string;
    content: string;
    boxLabel: string;
    copy: string;
  };
  texts: {
    primary: string;
    label: string;
    navigation: string;
    description: string;
    accordionHeading: string;
  };
  highlights: {
    selection: string;
  };
  borders: {
    input: string;
    box: string;
    tableRow: string;
  };
  gradients: {
    headerFooterGradient: string;
    organizationsHeaderGradient: string;
  };
  skeleton: {
    base: string;
    highlight: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends LagoonTheme {}
}
