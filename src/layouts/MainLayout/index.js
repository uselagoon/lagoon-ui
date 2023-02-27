import Header from "components/Header";
import Footer from "components/Footer";

/**
 * The main layout includes the Lagoon UI header.
 */
const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default MainLayout;
