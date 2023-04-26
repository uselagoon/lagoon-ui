import React from 'react';

import { getCreatedDate } from 'components/Dates';
import TableDisplay from 'components/TableDisplay';
import useTranslation from 'lib/useTranslation';

import { StyledDrutinyContent } from './StyledContent';

const DrutinyDisplay = ({ problem }) => {
  const t = useTranslation();
  const createdDate = getCreatedDate(problem.created);
  const data = JSON.parse(problem.data) || '';
  const environment = problem.environment;
  const source = problem.source || '';
  const columns = ['Module', 'Version', 'Latest'];

  return (
    <StyledDrutinyContent className="content-display-wrapper">
      {data.title && (
        <div className="field-wrapper">
          <label>{t('problem.label.title')}</label>
          <div className="title">{data.title}</div>
        </div>
      )}
      {data.description && data.description.length > 0 && (
        <div className="field-wrapper">
          <label>{t('problem.label.description')}</label>
          <div className="description">{data.description}</div>
        </div>
      )}
      {data.remediation && (
        <div className="field-wrapper">
          <label>{t('problem.label.remediation')}</label>
          <div className="remediation">{data.remediation}</div>
        </div>
      )}
      {source === 'Drutiny-algm:D8ModuleUpdates' ? (
        <div className="data-wrapper">
          <label>{t('problem.label.moduleUpdates')}</label>
          <div className="table">
            <TableDisplay columns={columns} data={JSON.parse(data.failure)} />
          </div>
        </div>
      ) : (
        <div className="data-wrapper">
          <label>{data.type ? data.type : t('general.results')}</label>
          <div className="data">
            <pre>{data.failure}</pre>
          </div>
        </div>
      )}
      {data.severity && (
        <div className="field-wrapper">
          <label>{t('problem.label.severity')}</label>
          <div className="severity">{data.severity}</div>
        </div>
      )}
      {data.service && (
        <div className="field-wrapper">
          <label>{t('problem.label.service')}</label>
          <div className="service">{data.service}</div>
        </div>
      )}
      {data.created && (
        <div className="field-wrapper">
          <label>{t('problem.label.lastDetected')}</label>
          <div className="time-ago">{data.created}</div>
        </div>
      )}
      {data.type && (
        <div className="field-wrapper">
          <label>{t('problem.label.type')}</label>
          <div className="type">{data.type}</div>
        </div>
      )}
      {createdDate && (
        <div className="field-wrapper">
          <label>{t('problem.label.created')}</label>
          <div className="created">{createdDate}</div>
        </div>
      )}
    </StyledDrutinyContent>
  );
};

export default DrutinyDisplay;
