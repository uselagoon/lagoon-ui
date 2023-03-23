import Header from "components/Header";
import Footer from "components/Footer";
import { StyledContentWrapper } from "./StyledStatusLayout";
import GlobalStyles from "../GlobalStyles";

/**
 * The status layout includes the Lagoon UI header and grey box to wrap content.
 */
const StatusLayout = ({ children }) => (
  <>
    <GlobalStyles />
    <StyledContentWrapper>
      <Header />
      <main className="content">{children}</main>
      <Footer />
    </StyledContentWrapper>
  </>
);

export const StatusLayoutNoHeader = ({ children }) => (
  <>
    <GlobalStyles />
    <StyledContentWrapper>
      <main className="content">{children}</main>
    </StyledContentWrapper>
  </>
);

export default StatusLayout;
