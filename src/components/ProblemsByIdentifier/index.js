import React, { useState } from 'react';
import useSortableData from './sortedItems';
import Accordion from 'components/Accordion';
import ProblemsLink from 'components/link/Problems';
import {StyledProblemsByIdentifier, IdentifierHeader} from "./StyledProblemsByIdentifier";
import useTranslation from "lib/useTranslation";

const ProblemsByIdentifier = ({ problems }) => {
  const t = useTranslation();
    const { sortedItems, getClassNamesFor, requestSort } = useSortableData(problems);

    const [problemTerm, setProblemTerm] = useState('');
    const [hasFilter, setHasFilter] = React.useState(false);
    const [moreProjectsLimit, setMoreProjectsLimit] = React.useState(5);

    const handleProblemFilterChange = (event) => {
      setHasFilter(false);

      if (event.target.value !== null || event.target.value !== '') {
        setHasFilter(true);
      }
      setProblemTerm(event.target.value);
    };

    const handleSort = (key) => {
      return requestSort(key);
    };

    const filterResults = (item) => {
      const lowercasedFilter = problemTerm.toLowerCase();
      if (problemTerm == null || problemTerm === "") {
        return problems;
      }

      return Object.keys(item).some((key) => {
        if (item[key] !== null) {
          return item[key]
            .toString()
            .toLowerCase()
            .includes(lowercasedFilter);
        }
      });
    };

    const onLoadMore = () => {
      setMoreProjectsLimit(moreProjectsLimit + moreProjectsLimit);
    };

    return (
      <StyledProblemsByIdentifier className="problems">
        <div className="filters">
          <input
            type="text"
            id="filter"
            placeholder={t("placeholders.problemsByIdentifier")}
            value={problemTerm}
            onChange={handleProblemFilterChange}
          />
        </div>
        <IdentifierHeader>
          <button
            type="button"
            onClick={() => handleSort("identifier")}
            className={`button-sort identifier ${getClassNamesFor(
              "identifier"
            )}`}
          >
            {t("problemsDashboard.identifier.problem")}
          </button>
          <button
            type="button"
            onClick={() => handleSort("source")}
            className={`button-sort source ${getClassNamesFor("source")}`}
          >
            {t("problemsDashboard.identifier.source")}
          </button>
          <button
            type="button"
            onClick={() => handleSort("severity")}
            className={`button-sort severity ${getClassNamesFor("severity")}`}
          >
            {t("problemsDashboard.identifier.severity")}
          </button>
          <button
            type="button"
            onClick={() => handleSort("projectsAffected")}
            className={`button-sort projectsAffected ${getClassNamesFor(
              "projectsAffected"
            )}`}
          >
            {t("problemsDashboard.identifier.affected")}
          </button>
        </IdentifierHeader>
        <div className="data-table">
          {!sortedItems.filter((item) => filterResults(item)).length && (
            <div className="data-none">
              {t("problemsDashboard.identifier.noProblems")}
            </div>
          )}
          {sortedItems
            .filter((item) => filterResults(item))
            .map((item) => {
              const {
                identifier,
                source,
                severity,
                problems,
                environment,
              } = item;
              const { description, associatedPackage, links } =
                problems[0] || "";

              const columns = {
                identifier: identifier,
                source,
                severity,
                projectsAffected:
                  (problems && problems.filter((p) => p != null).length) || 0,
              };

              return (
                <Accordion
                  key={identifier}
                  columns={columns}
                  defaultValue={false}
                  className="data-row row-heading"
                >
                  <div className="expanded-wrapper">
                    <div className="left-content">
                      <div className="fieldWrapper">
                        <label>
                          {t("problemsDashboard.identifier.labels.description")}
                        </label>
                        {description && (
                          <div className="description">
                            {description.length > 250
                              ? description.substring(0, 247) + "..."
                              : description}
                          </div>
                        )}
                      </div>
                      <div className="fieldWrapper">
                        <label>
                          {t("problemsDashboard.identifier.labels.package")}
                        </label>
                        {associatedPackage && (
                          <div className="package">{associatedPackage}</div>
                        )}
                      </div>
                      <div className="fieldWrapper">
                        <label>
                          {t(
                            "problemsDashboard.identifier.labels.associatedLink"
                          )}
                        </label>
                        {links && (
                          <div className="links">
                            <a href={links} target="_blank">
                              {links}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="right-content">
                      <div className="fieldWrapper">
                        <label>
                          {t(
                            "problemsDashboard.identifier.labels.projectsAffected"
                          )}
                        </label>
                        {problems &&
                          problems
                            .filter((p) => p != null)
                            .slice(0, moreProjectsLimit)
                            .map((problem) => {
                              const {
                                id,
                                name: envName,
                                openshiftProjectName,
                                environmentType,
                                project,
                              } = problem.environment || "";

                              return (
                                <div key={id} className="name">
                                  <ProblemsLink
                                    environmentSlug={openshiftProjectName}
                                    projectSlug={project && project.name}
                                    className="problems-link"
                                  >
                                    {project ? `${project.name}` : ""}
                                    {envName
                                      ? ` : ${envName.toLowerCase()}`
                                      : ""}
                                  </ProblemsLink>
                                </div>
                              );
                            })}
                        {problems &&
                          problems.filter((p) => p != null).length >
                            moreProjectsLimit && (
                            <button
                              className="button more"
                              onClick={(e) => onLoadMore(e)}
                            >
                              {t("general.more")}
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                </Accordion>
              );
            })}
        </div>
      </StyledProblemsByIdentifier>
    );
};

export default ProblemsByIdentifier;
