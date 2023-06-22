import React from 'react';
import { generateEnvironments, seed } from '../../../.storybook/mocks/mocks';
import BulkDeploymentLink from './BulkDeployment';

export default {
  component: BulkDeploymentLink,
  title: 'Components/link/BulkDeploymentLink',
};

seed();
const deployment = generateEnvironments();

export const Default = () => (
  <BulkDeploymentLink bulkIdSlug={deployment.bulkId}>Bulk Deployment link</BulkDeploymentLink>
);
