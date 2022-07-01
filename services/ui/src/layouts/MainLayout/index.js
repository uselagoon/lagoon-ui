import React from 'react';
import GlobalStyles from 'layouts/GlobalStyles';
import Header from 'components/Header';

/**
 * The main layout includes the Lagoon UI header.
 */
const MainLayout = ({ projects, children }) => (
  <GlobalStyles>
    <Header projects={projects}/> 
      <div className="main">
        { children }
      </div>
  </GlobalStyles>
);

export default MainLayout;
