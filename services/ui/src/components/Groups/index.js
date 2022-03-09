import React from 'react';
import { bp, color, fontSize } from 'lib/variables';

const Groups = ({ me: { id, email, groups }}) => {

  return(
    <div className="groups">
      <div className="header">
        <label className="name">Name</label>
        <label className="type">Type</label>
      </div>
      <div className="data-table">
        {!groups.length && <div className="data-none">No Groups</div>}
        {groups.map(group => (
          <div className="data-row" key={group.id}>
            <div className="name">{group.name}</div>
            <div className="type">{group.type}</div>
          </div>
        ))}
      </div>
        <style jsx>{`
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
              width: 25%;
              @media ${bp.extraWideUp} {
                width: 25%;
              }
            }

            &.type {
              width: 75%;
              @media ${bp.extraWideUp} {
                width: 75%;
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
                  width: 25%;
                  overflow-wrap: break-word;
                }

                &.type {
                  align-self: center;
                  width: 75%;
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

      `}</style>
    </div>
  );
};

export default Groups;
