import styled from "styled-components";
import { bp, color } from "lib/variables";

export const StyledKeys = styled.div`
  .header {
    @media ${bp.wideUp} {
      align-items: center;
      display: flex;
      margin: 0 0 14px;
      padding-right: 40px;
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
      @media ${bp.wideUp} {
        display: block;
      }

      &.name {
        width: 18%;
        @media ${bp.extraWideUp} {
          width: 18%;
        }
      }

      &.type {
        width: 15%;
        @media ${bp.extraWideUp} {
          width: 15%;
        }
      }

      &.fingerprint {
        width: 40%;
        @media ${bp.extraWideUp} {
          width: 40%;
        }
      }

      &.created {
        width: 25%;
        @media ${bp.extraWideUp} {
          width: 25%;
        }
      }
    }
  }

  .data-table {
    background-color: ${color.white};
    border: 1px solid ${color.lightestGrey};
    border-radius: 3px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);

    .data-none {
      border: 1px solid ${color.white};
      border-bottom: 1px solid ${color.lightestGrey};
      border-radius: 3px;
      line-height: 1.5rem;
      padding: 8px 0 7px 0;
      text-align: center;
    }

    .data-row {
      border: 1px solid ${color.white};
      border-bottom: 1px solid ${color.lightestGrey};
      border-radius: 0;
      line-height: 1.5rem;
      padding: 8px 0 7px 0;
      @media ${bp.wideUp} {
        display: flex;
        justify-content: space-between;
        padding-right: 15px;
      }

      & > div {
        padding-left: 20px;
        @media ${bp.wideDown} {
          padding-right: 40px;
        }
        @media ${bp.wideUp} {
          &.name {
            align-self: center;
            width: 35%;
            overflow-wrap: break-word;
          }

          &.type {
            align-self: center;
            width: 20%;
          }

          &.fingerprint {
            align-self: center;
            overflow-wrap: break-word;
            width: 35%;
          }

          &.created {
            align-self: center;
            width: 20%;
            @media ${bp.extraWideUp} {
              width: 20%;
            }
          }

          &.delete {
            width: 25%;
            @media ${bp.extraWideUp} {
              width: 20%;
            }
          }
        }

        &.created {
          word-break: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          @media ${bp.wideUp} {
            width: 45%;
          }
          @media ${bp.extraWideUp} {
            width: 50%;
          }
        }
      }

      &:hover {
        border: 1px solid ${color.brightBlue};
      }

      &:first-child {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }

      &:last-child {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
      }
    }
  }
`;
