import React, { useState } from 'react';
import Link from 'next/link';
import css from 'styled-jsx/css';
import Highlighter from 'react-highlight-words';
import OrgGroupsLink from 'components/link/Organizations/Group';
import Box from 'components/Box';
import { bp, color, fontSize } from 'lib/variables';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'components/Button';
import withLogic from 'components/Organizations/Groups/logic';
import DeleteConfirm from 'components/DeleteConfirm';

const { className: boxClassName, styles: boxStyles } = css.resolve`
  .box {
    .content {
      padding: 9px 20px 14px;
      // padding: 5px;
      @media ${bp.tinyUp} {
        display: flex;
      }
    }
  }
`;

const DELETE_GROUP = gql`
  mutation deleteGroup($groupName: String!) {
    deleteGroup(input:{
      group:{
        name: $groupName
      }
    })
  }
`;

/**
 * The primary list of groups.
 */
const Groups = ({ groups = [], organizationId, organizationName }) => {
  const [searchInput, setSearchInput] = useState('');

  const filteredGroups = groups.filter(key => {
    const sortByName = key.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    let sortByUrl = '';
    return ['name', 'environments', '__typename'].includes(key)
      ? false
      : (true && sortByName) || sortByUrl;
  });

  return (
    <>
      <div className="header">
        <label>Groups</label>
        <label></label>
        <input
          aria-labelledby="search"
          className="searchInput"
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Type to search"
          disabled={groups.length === 0}
        />
      </div>

<div className="deployments">
  <div className="data-table">
      {!groups.length && (
        <div className="data-none">No groups</div>
      )}
      {(searchInput && !filteredGroups.length) && (
        <div className="data-none">No groups matching "{searchInput}"</div>
      )}
      {filteredGroups.map(group => (
          <div key={group.name} className="data-row" group={group.name}>
          <div className="group">
            <OrgGroupsLink groupSlug={group.name}
              organizationSlug={organizationId}
              organizationName={organizationName}
              key={group.id}>{group.name}
            </OrgGroupsLink>
          </div>
          <div className="customer">
            {(group.type.includes("project-default-group")) && (<label className="default-group-label">{group.type}</label>)}
          </div>
          <div className="customer">
            Members: {group.members.length}
          </div>
          {/* <div className="customer">
            Projects: {group.projects.length}
          </div> */}
          {(!group.type.includes("project-default-group")) && (
            <div className="remove">
              <Mutation mutation={DELETE_GROUP}>
              {(deleteGroup, { loading, called, error, data }) => {
                if (error) {
                  return <div>{error.message}</div>;
                }
                if (data) {
                  window.location.reload();
                }
                return (
                  <DeleteConfirm
                    deleteName={group.name}
                    deleteType="group"
                    onDelete={() => {
                      deleteGroup({
                        variables: {
                          groupName: group.name,
                        }
                      })
                    }
                    }
                  />
                );
              }}
            </Mutation>
            </div>
            ) || (<div className="remove"></div>)}
          </div>
      ))}
      </div>
    </div>
      <style jsx>{`
        .default-group-label {
          color: ${color.white};
          background-color: ${color.black};
          margin-left: 10px;
          padding: 5px 10px 5px 10px;
          border-radius: 4px;
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
        }
        .remove {
          display:flex; justify-content:flex-end; padding:0;
          width: 20%;
        }
        .group {
          font-family: 'source-code-pro',sans-serif;
          font-size: 0.8125rem;
          padding: 5px 10px 5px 10px;
          width: 50%;
          .comment {
            font-size: 10px;
          }
          font-weight: normal;
        }
        .customer {
          font-family: 'source-code-pro',sans-serif;
          font-size: 0.8125rem;
          padding: 5px 10px 5px 10px;
          color: ${color.darkGrey};
          width: 30%;
          .comment {
            font-size: 10px;
          }
          font-weight: normal;
        }
        .newGroup {
          background: ${color.midGrey};
          padding: 15px;
          @media ${bp.smallOnly} {
            margin-bottom: 20px;
            order: -1;
            width: 100%;
          }
        }
        .form-box input, textarea{
          display: inline-block;
          width: 50%;
          border-width:1px;
          border-style: solid;
          border-radius: 4px;
          min-height: 38px;
          border-color: hsl(0,0%,80%);
          font-family: 'source-code-pro',sans-serif;
          font-size: 0.8125rem;
          color: #5f6f7a;
          padding: 8px;
          box-sizing: border-box;
        }
        input[type="text"]:focus {
          border: 2px solid ${color.linkBlue};
          outline: none;
        }
        label {
          padding-left: 20px;
          padding-right: 15px;
        }
        .data-table {
          background-color: ${color.white};
          border: 1px solid ${color.midGrey};
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
            background-position: right 20px center;
            background-repeat: no-repeat;
            background-size: 18px 11px;
            border: 1px solid ${color.white};
            border-bottom: 1px solid ${color.lightestGrey};
            border-radius: 0;
            line-height: 1.5rem;
            padding: 8px 0 7px 0;
            @media ${bp.tinyUp} {
              display: flex;
              justify-content: space-between;
              padding-right: 40px;
            }

            & > div {
              padding-left: 20px;
              @media ${bp.tinyUp} {
                // width: 50%;
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
        .header {
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
          .searchInput {
            background: url('/static/images/search.png') 12px center no-repeat
              ${color.white};
            background-size: 14px;
            border: 1px solid hsl(0,0%,80%);
            border-radius: 4px;
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
              color: ${color.grey};
            }
            &:focus {
              border: 1px solid ${color.brightBlue};
              outline: none;
            }
          }
          label {
            display: none;
            padding-left: 20px;
            width: 100%;
            @media ${bp.tinyUp} {
              display: block;
            }
            &:nth-child(2) {
              @media ${bp.tabletUp} {
                width: 20%;
              }
            }
          }
        }
        .description {
          // color: ${color.darkGrey};
          line-height: 24px;
        }
      `}</style>
      {boxStyles}
    </>
  );
};

export default withLogic(Groups);
