import Footer from 'components/Footer';
import Header from 'components/Header';

import GlobalStyles from '../GlobalStyles';

/**
 * The main layout includes the Lagoon UI header.
 */
const MainLayout = ({ children }) => (
  <>
    <GlobalStyles />
    <Header />
    {children}
    <Footer />
  </>
);

export default MainLayout;
