import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const StyledBreadCrumb = styled.div`
  height: max-content;
  position: relative;
  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    label {
      font-size: clamp(0.5rem, 1vw, 0.815rem);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -36px;
    width: 1px;
    height: 200%;
    background: ${props => props.theme.backgrounds.breadCrumb};
    transform-origin: 100% 0;
    transform: skew(-12deg) translateY(-20%);
  }

  h2 {
    margin-bottom: 0;
    line-height: initial;
    font-size: clamp(1.2rem, 1.875vw, 2.25rem);
  }
`;

export const BreadCrumbLink = styled.a`
  margin-right: 72px;
  &:first-child {
    .breadcrumb {
      padding-left: 0;

      &::after {
        content: none;
      }
    }
  }
`;

export const StyledBreadcrumbsWrapper = styled.div`
  padding: 1vw 0.75vw;
  min-height:100px;
  background-color: ${props => props.theme.backgrounds.breadCrumbs};
  border-bottom: ${props =>
    props.theme.colorScheme === 'dark' ? `2px solid ${props.theme.borders.box}` : `1px solid ${color.midGrey}`};
  overflow: hidden;
  @media ${bp.tabletUp} {
    padding: 1.75vw 0 1.25vw;
  }

  .breadcrumbs {
    display: flex;
    margin: 0 calc((100vw / 16) * 1);
  }
`;
