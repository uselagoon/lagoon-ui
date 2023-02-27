import Header from "components/Header";
import Footer from "components/Footer";
import { StyledContentWrapper } from "./StyledStatusLayout";

/**
 * The status layout includes the Lagoon UI header and grey box to wrap content.
 */
const StatusLayout = ({ children }) => (
  <>
    <Header />
    <StyledContentWrapper>
      <div className="content">{children}</div>
    </StyledContentWrapper>
    <Footer />
  </>
);

export const StatusLayoutNoHeader = ({ children }) => (
  <>
    <StyledContentWrapper>
      <div className="content">{children}</div>
    </StyledContentWrapper>
  </>
);

export default StatusLayout;
