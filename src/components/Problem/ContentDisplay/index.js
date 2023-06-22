import React from 'react';

import DefaultDisplay from 'components/Problem/ContentDisplay/DefaultContent';
import DrutinyContent from 'components/Problem/ContentDisplay/DrutinyContent';

const ContentDisplay = ({ problem }) => (
  <>
    {problem.source.startsWith('Drutiny') ? <DrutinyContent problem={problem} /> : <DefaultDisplay problem={problem} />}
  </>
);

export default ContentDisplay;
