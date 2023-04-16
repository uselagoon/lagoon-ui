import styled from "styled-components";
import { color } from "lib/variables";

export const StyledFooter = styled.footer`
        background: ${color.brightBlue} ${color.lightBlue};
        background: ${color.lightBlue};
        background: ${props => props.theme.gradients.headerFooterGradient};
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${color.brightBlue}', endColorstr='${color.lightBlue}',GradientType=1 );
        display: flex;
        justify-content: space-between;

        span {
          color: ${color.almostWhite};
          padding: 10px 20px;
          &.version {
            background: ${color.blue};
            position: relative;
            img {
              display: block;
              height: 28px;
              width: auto;
            }
            &::after {
              background: ${color.blue};
              clip-path: polygon(0 0,100% 0,0 105%,0 100%);
              content: '';
              display: block;
              height: 100%;
              position: absolute;
              right: -13px;
              top: 0;
              width: 14px;
            }
          }
        }
    
`;
