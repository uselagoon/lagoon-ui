import styled from "styled-components";

export const StyledResultsLimited = styled.div`
  .results {
    padding: 8px;
    display: flex;
    justify-content: right;
  }
  .description {
    background: ${props => props.theme.colorScheme === "dark" ? `${props.theme.backgrounds.primary}` : `${props.theme.backgrounds.secondary}`};
    border: 1px solid ${props => props.theme.borders.tableRow};
    border-radius: 3px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
    justify-content: space-between;
    margin-top: 8px;
    padding: 8px;
    display: flex;
    justify-content: center;
    color: ${props => props.theme.texts.label};
  }
  [id^=react-select] > *{ 
    color:black
  }
`;
