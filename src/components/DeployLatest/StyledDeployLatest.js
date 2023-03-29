import styled from "styled-components";
import { bp, color } from "lib/variables";

export const NewDeployment = styled.div`
  align-items: center;
  background: ${color.white};
  border: 1px solid ${color.lightestGrey};
  border-radius: 3px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 15px;

  @media ${bp.tabletUp} {
    margin-bottom: 0;
  }

  @media ${bp.wideUp} {
    min-width: 52%;
  }

  .description {
    color: ${color.darkGrey};
  }

  .deploy_result {
    margin-top: 20px;
    text-align: right;
    width: 100%;
  }
`;
