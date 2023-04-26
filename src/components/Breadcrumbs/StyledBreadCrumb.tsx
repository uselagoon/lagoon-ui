import { bp, color, fontSize } from 'lib/variables';
import styled from 'styled-components';

export const StyledBreadCrumb = styled.div`
  height: 100%;
  padding: 32px 16px 0 46px;
  position: relative;
  @media ${bp.tabletUp} {
    padding: 42px 76px 0 96px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 30px;
    width: 1px;
    height: 100%;
    background: ${color.midGrey};
    transform-origin: 100% 0;
    transform: skew(-12deg);
  }

  h2 {
    ${fontSize(28)};
    margin-bottom: 24px;
    @media ${bp.tabletUp} {
      ${fontSize(36)};
      margin-bottom: 38px;
    }
  }
`;

export const BreadCrumbLink = styled.a`
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
  background-color: ${color.white};
  border-bottom: 1px solid ${color.midGrey};

  .breadcrumbs {
    display: flex;
    margin: 0 calc((100vw / 16) * 1);
  }
`;
