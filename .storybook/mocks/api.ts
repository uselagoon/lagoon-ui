import { faker } from '@faker-js/faker';

import {
  ProblemIdentifier,
  generateEnvironments,
  organizationEmails,
  organizationGroups,
  organizationNotifications,
  organizationOwners,
  organizationProjects,
  organizationEnvironments
} from './mocks';

faker.setDefaultRefDate(new Date(`${new Date().getFullYear().toString()}-01-01`));

export interface Project {
  id: string;
  name: string;
  factsUi?: number;
  problemsUi?: number;
  __typename: 'Project';
  environments: {
    route: string;
    __typename: 'Environment';
  }[];
}

export const MockAllProjects = (seed: number) => {
  if (seed) faker.seed(seed);

  const numberOfProjects = faker.number.int({ min: 10, max: 20 });

  const allProjects: Project[] = Array.from({ length: numberOfProjects }, () => {
    return {
      id: faker.string.uuid(),
      name: faker.word.words(),
      __typename: 'Project',
      environments: [
        {
          route: faker.internet.url(),
          __typename: 'Environment',
          openshift: {
            friendlyName: faker.word.words(),
            cloudRegion: 'NA',
          },
        },
      ],
    };
  });

  return allProjects;
};

export const MockSettings = (seed: number) => {
  if (seed) {
    faker.seed(seed);
  }

  const me = {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    id: faker.string.uuid(),
    lastName: faker.person.lastName(),
    sshKeys: [
      'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAgQDU/asJRZkN/qcIF4zipV4x/Za/T5qYr9rjojsMZIp5IejfiChQEgSazl2yYp46WC6YhIk+TA3nepHF5SGKWpJLHdDBetTAlbeb5fcsKui3AF59okyNH2f3ijDsuZjqKPlQL5o8EmeNa2F2YYXWOKwdort6fOXug7NUL7TU2TIJwQ== noname',
    ],
    __typename: 'User',
  };
  return me;
};

export const MockAllDeployments = (seed: number) => {
  faker.seed(seed);
  const numberOfDeployments = faker.number.int({ min: 5, max: 20 });

  // function to create fake environment names with name/like/so or-name-like-so or a long word
  const formattedNameString = () => {
    const format = faker.number.int({ min: 1, max: 3 });
    const projectEnvName = faker.word.words({ count: { min: 2, max: 5 } });

    switch (format) {
      case 1:
        return projectEnvName.replace(/\s/g, '/');
      case 2:
        return projectEnvName.replace(/\s/g, '-');
      case 3:
        return projectEnvName.replace(/\s/g, '');
      default:
        return '';
    }
  };

  const allDeployments = Array.from({ length: numberOfDeployments }, () => {
    const created = faker.date.past().toDateString();

    return {
      status: faker.helpers.arrayElement(['new', 'pending', 'running', 'cancelled', 'error', 'failed', 'complete']),
      name: faker.lorem.slug({ min: 1, max: 5 }),
      priority: faker.helpers.arrayElement(['critical', 'urgent', 'low']),
      created: created,
      completed: faker.date.future({ refDate: created }).toDateString(),
      environment: {
        name: formattedNameString(),
        project: {
          name: faker.lorem.slug({ min: 1, max: 3 }),
        },
        openshift: {
          name: faker.word.words(),
        },
      },
    };
  });
  return allDeployments;
};

export const MockBulkDeployments = (seed: number) => {
  faker.seed(seed);

  const bulkNumber = faker.number.int({ min: 1, max: 10 });

  const bulkDeployments = Array.from({ length: bulkNumber }, (_, idx) => {
    faker.seed(idx);
    return {
      id: faker.string.uuid(),
      status: faker.helpers.arrayElement(['new', 'pending', 'running', 'cancelled', 'error', 'failed', 'complete']),
      name: faker.lorem.slug({ min: 1, max: 5 }),
      created: faker.date.past().toDateString(),
      started: faker.date.past().toDateString(),
      buildStep:faker.word.words(),
      completed: faker.date.past().toDateString(),
      buildLog: faker.word.words(),
      bulkId: faker.string.uuid(),
      bulkName: faker.lorem.slug(),
      priority: faker.helpers.arrayElement(['critical', 'urgent', 'low']),
      environment: generateEnvironments({ seed: idx }),
    };
  });
  return bulkDeployments;
};

export const ProjectsProblems = (seed: number) => {
  faker.seed(seed);

  const projectCount = faker.number.int({ min: 1, max: 200 });

  const allProblems = Array.from({ length: projectCount }, (_, index) => {
    const problemIdentifier = index + 1;

    return {
      id: faker.number.int({ min: 1, max: 1000 }),
      name: faker.lorem.slug({ min: 2, max: 3 }),
      environments: [
        {
          id: faker.number.int({ min: 100, max: 2000 }),
          name: faker.word.words(),
          problems: ProblemIdentifier(problemIdentifier).problems,
        },
      ],
    };
  });
  return allProblems;
};

export const getOrganization = () => {
  faker.seed(123);

  const projectQuota = faker.number.int({ min: 1, max: 10 });
  const groupQuota = faker.number.int({ min: 1, max: 10 });
  const environmentQuota = faker.number.int({ min: 1, max: 10 });
  const routeQuota = faker.number.int({ min: 1, max: 10 });

  const { slack, rocketChat, teams, webhook } = organizationNotifications();

  return {
    id: 1,
    name: 'Test Org',
    description: 'An organization for testing',
    quotaProject: projectQuota,
    quotaGroup: groupQuota,
    quotaNotification: 10,
    quotaEnvironment: environmentQuota,
    quotaRoute: routeQuota,
    __typename: 'Organization',
    deployTargets: [
      {
        id: faker.number.int(),
        name: 'ci-local-control-k8s',
        __typename: 'Openshift',
      },
    ],
    owners: organizationOwners(),
    projects: organizationProjects(projectQuota),
    groups: organizationGroups(groupQuota),
    environments: organizationEnvironments(environmentQuota),
    slacks: slack,
    rocketchats: rocketChat,
    teams,
    webhook,
    emails: organizationEmails(),
  };
};
