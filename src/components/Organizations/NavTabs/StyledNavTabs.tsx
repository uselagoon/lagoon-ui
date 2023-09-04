import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const StyledNavigation = styled.ul`
  background: ${props => props.theme.backgrounds.sidebar};
  border-right: 1px solid ${props => props.theme.borders.input};
  margin: 0;
  z-index: 10;
  @media ${bp.tabletUp} {
    min-width: 30%;
    padding-bottom: 60px;
  }
  @media ${bp.wideUp} {
    min-width: 25%;
  }
  li {
    border-bottom: 1px solid ${props => props.theme.borders.input};
    margin: 0;
    padding: 0;
    position: relative;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${color.white} !important;
    }
    a {
      color: ${props => props.theme.texts.navigation};
      display: block;
      &:hover{
        color: ${props => (props.theme.colorScheme === 'dark' ? props.theme.backgrounds.box : 'initial')} !important;
      }
    }

    &.active {
      background-color: ${props => props.theme.backgrounds.secondary};
      border-right: 1px solid ${props => props.theme.backgrounds.content};
      width: calc(100% + 1px);

      a {
        color: ${props => props.theme.texts.navigation};
      }
    }
 
  }
  .linkContainer{
    margin-bottom:1px;

    span[role="img"]{
      background:#497FFA;
      height:60px;
      width:50px;
      display:inline-flex;
      align-items:center;
      justify-content:center;
      svg{
        fill:#fff;
        font-size:32px;
      }
    }
    .destination{
      display:inline-flex;
      align-items:center;
      margin-left:36px;
      font-size:1rem;
      line-height:24px;
    }
  }


  .navLink {
    display:flex;
    a {
      color: ${props => props.theme.texts.navigation};
      display: block;
      padding: 20px 20px 19px 60px;
      transition: color 0.2s ease;
      &:hover {
        color: ${color.darkGrey};
      }
    
    .active a {
      color: ${color.black};
    }
 
  }
`;
