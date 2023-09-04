import styled from 'styled-components';

export const StyledOrgHeader = styled.div`
  color: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : '#5f6f7a')};
  margin-bottom: 25px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 97%;
`;

export const SearchBar = styled.div`
  position: relative;
  height: 25px;
  display: flex;
  min-width: 290px;

  .searchBar {
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 30px !important;
    height: 25px;
    min-width: 290px;

    &::placeholder {
      color: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : '#5f6f7a')};
      line-height: 20px;
      font-size: 13px;
      font-weight: 500;
    }
    z-index: 0;
  }
  .icon {
    position: absolute;
    left: 12px;
    top: 6px;
    z-index: 1;
  }
`;
