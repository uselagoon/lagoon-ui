import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const ProjectsPage = styled.section`
  .box {
    margin-bottom: 7px;

    & > .content {
      padding: 9px 20px 14px;
      @media ${bp.tinyUp} {
        display: flex;
      }
    }
  }
`;

export const ProjectsHeader = styled.div`
  @media ${bp.tinyUp} {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    margin: 0 0 14px;
  }
  @media ${bp.smallOnly} {
    flex-wrap: wrap;
  }
  @media ${bp.tabletUp} {
    margin-top: 40px;
  }
  label {
    display: none;
    padding-left: 20px;
    width: 50%;
    @media ${bp.tinyUp} {
      display: block;
    }
    &:nth-child(2) {
      @media ${bp.tabletUp} {
        width: 20%;
      }
    }
  }
`;

export const SearchInput = styled.input`
  background: url('/static/images/search.png') 12px center no-repeat ${props => props.theme.backgrounds.input};
  background-size: 14px;
  border: 1px solid ${props => props.theme.borders.input};
  height: 40px;
  padding: 0 12px 0 34px;
  transition: border 0.5s ease;
  @media ${bp.smallOnly} {
    margin-bottom: 20px;
    order: -1;
    width: 100%;
  }
  @media ${bp.tabletUp} {
    width: 30%;
  }
  &::placeholder {
    color: ${color.midGrey};
  }
  &:focus {
    border: 1px solid ${color.brightBlue};
    outline: none;
  }
`;

export const StyledProject = styled.div`
  font-weight: normal;

  @media ${bp.tinyUp} {
    width: 50%;
  }
`;

export const StyledRoute = styled.div`
  color: ${color.linkBlue};
  line-height: 24px;
`;

export const StyledCustomer = styled.div`
  color: ${color.darkGrey};
  padding-top: 16px;
  @media ${bp.tinyUp} {
    padding-left: 20px;
  }
  @media ${bp.wideUp} {
    width: calc((100vw / 16) * 7);
  }
  @media ${bp.extraWideUp} {
    width: calc((100vw / 16) * 6);
  }
`;
