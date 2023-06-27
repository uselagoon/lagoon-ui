import React from 'react';

import { createGlobalStyle } from 'styled-components';

/*
Styled-components recalculates styles at runtime whenever the theme switches;
That makes performance abysmal when working with storybook's rendering environment.
The below styles are only for dynamic global components.

*/
const GlobalStyles = React.memo(createGlobalStyle`

:root {
  color-scheme: ${props => props.theme.colorScheme};
}

body {
  color: ${props => props.theme.texts.primary};
}

.content-wrapper {
  background-color:${props => props.theme.backgrounds.primary};
}

a {
  color: ${props => props.theme.texts.primary};
}
mark {
  background-color: ${props => props.theme.highlights.selection};
}

label {
  color: ${props => props.theme.texts.label};
}

main{  
  background-color:${props => props.theme.backgrounds.primary};
 }
 .modal__overlay {
    background-color:${props => props.theme.backgrounds.modalOverlay};
  }
.modal__content {
background:${props => props.theme.backgrounds.primary};
  color: ${props => props.theme.texts.primary};
  }
`);

export default GlobalStyles;
