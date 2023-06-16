import { color } from 'lib/variables';
import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  colorScheme: 'dark',

  backgrounds: {
    primary: '#0E1117',
    secondary: '#151922',
    tertiary: '#161b25',
    modalOverlay: '#050503',
    input: '#3B3B3B',
    content: '#222837',
    table: '#0E1117',
    tableLight: '#1f2634',
    box: '#151922',
    breadCrumbs: '#151922',
    breadCrumb: '#46505d',
    sidebar: '#1b212d',
    boxLabel: 'transparent',
    copy: '#0E1117',
  },
  texts: {
    primary: '#e5e5e5',
    label: '#dee2e5',
    navigation: '#fff',
    description: '#fff',
    accordionHeading: '#fff',
  },
  borders: {
    input: '#46505d',
    box: '#1b212d',
    tableRow: '#46505d',
  },
  highlights: {
    selection: '#f6f9ff',
  },
  gradients: {
    headerFooterGradient: 'linear-gradient(to right, #24aec4 0%, #2a6dfe 25%)',
  },
  skeleton: {
    base: '#353535',
    highlight: '#444',
  },
};

export const lightTheme: DefaultTheme = {
  colorScheme: 'light',

  backgrounds: {
    primary: color.almostWhite,
    secondary: color.white,
    tertiary: '#F3F3F3',
    modalOverlay: '#fafafcbf',
    input: color.white,
    sidebar: color.almostWhite,
    table: color.white,
    tableLight: color.lightestGrey,
    box: color.white,
    breadCrumbs: color.white,
    breadCrumb: color.midGrey,
    content: color.almostWhite,
    boxLabel: color.white,
    copy: color.white,
  },
  texts: {
    primary: color.black,
    label: color.darkGrey,
    navigation: color.darkGrey,
    description: color.darkGrey,
    accordionHeading: color.black,
  },
  borders: {
    input: color.midGrey,
    box: color.lightestGrey,
    tableRow: color.lightestGrey,
  },
  highlights: {
    selection: '#497ffa4d',
  },
  gradients: {
    headerFooterGradient: `linear-gradient(to right, ${color.brightBlue} 0%,${color.lightBlue} 25%)`,
  },
  skeleton: {
    base: '#ebebeb',
    highlight: '#f5f5f5',
  },
};
