import React from 'react';

import DefaultDisplay from 'components/Problem/ContentDisplay/DefaultContent';
import DrutinyContent from 'components/Problem/ContentDisplay/DrutinyContent';
import { bp, color, fontSize } from 'lib/variables';

const ContentDisplay = ({ problem }) => (
  <>
    {problem.source.startsWith('Drutiny') ? <DrutinyContent problem={problem} /> : <DefaultDisplay problem={problem} />}
  </>
);

export default ContentDisplay;
