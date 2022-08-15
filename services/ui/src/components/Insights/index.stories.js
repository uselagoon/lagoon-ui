import React from 'react';
import Insights from './index';
import mocks, { generator } from 'mock_data/mocks';

export default {
    component: Insights,
    title: 'Components/Insights',
    parameters: {
      layout: 'fullscreen',
    }
}

export const Default = () => (
  <Insights insights={generator(mocks.Insight, 1, 10)} />
);

export const NoInsights = () => (
  <Insights insights={[]} />
);
