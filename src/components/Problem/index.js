import React from 'react';
import Accordion from 'components/Accordion';
import { getFromNowTime } from "components/Dates";
import ContentDisplay from "components/Problem/ContentDisplay";

const Problem = ({ problem, display }) => {
    const fromNowDate = getFromNowTime(problem.created);
    const columns = {
        identifier: problem.identifier,
        severity: problem.severity,
        source: problem.source,
        created: fromNowDate,
        service: problem.service,
        associatedPackage: problem.version ? `${problem.associatedPackage}:${problem.version}` : problem.associatedPackage
    };

    return (
        <>
            {!display && (
                <Accordion
                    key={problem.id}
                    columns={columns}
                    meta={problem.project}
                    defaultValue={false}
                    className="data-row row-heading">
                    <div className="problem-wrapper">
                        <ContentDisplay problem={problem} />
                    </div>
                </Accordion>
            )}
            {display === "slug" && (
                <div className="problem-wrapper">
                    <div className="problem-header details">
                        <div>
                            <label>ID</label>
                            <p>{problem.id}</p>
                        </div>
                        <div>
                            <label>Created</label>
                            <p>{problem.created}</p>
                        </div>
                        <div>
                            <label>Status</label>
                            <p>-</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Problem;
