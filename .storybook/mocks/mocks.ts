import { faker } from '@faker-js/faker';

import { MockAllProjects, Project } from './api';

interface Tasks {
  tasks: {
    taskName: string;
    name: string;
    adminOnlyView: boolean;
    created: string;
    service: string;
    status: string;
    id: string;
  }[];
  environmentSlug: string;
  projectSlug: string;
}

type TaskFile = {
  id: string;
  download: string;
  filename: string;
};
interface Task {
  task: {
    created: string;
    service: string;
    status: string;
    files: TaskFile[];
    logs: string;
    taskName: string;
    name?: string;
    id: string;
  };
}
faker.setDefaultRefDate(new Date(`${new Date().getFullYear().toString()}-01-01`));

export const seed = (val = 123) => faker.seed(val);

export function createTasks(): Tasks {
  const numberOftasks = faker.number.int({ min: 1, max: 10 });
  const tasks = Array.from({ length: numberOftasks }, () => {
    return {
      taskName: faker.word.words(),
      name: faker.helpers.arrayElement(['Drush uli', 'Drush cache-clear', 'Drush sql-dump', 'Custom Task']),
      adminOnlyView: faker.datatype.boolean(),
      created: faker.date.anytime().toDateString(),
      service: 'cli',
      status: faker.helpers.arrayElement(['Pending', 'In progress', 'Completed']),
      id: faker.string.uuid(),
    };
  });

  return { tasks, environmentSlug: faker.lorem.slug(), projectSlug: faker.lorem.slug() };
}

export function createTask(): Task {
  const generateLogMessage = () => {
    return faker.git.commitMessage();
  };

  const status = faker.helpers.arrayElement(['active', 'succeeded', 'failed']);
  const eventName = faker.word.words();
  const jobName = faker.word.words();
  const stepName = faker.word.words();
  const duration = Math.floor(faker.number.int({ min: 0, max: 1 }) * 10) + 1;

  const log =
    `::group::${eventName}\n` +
    `::${status[Math.floor(faker.number.int({ min: 0, max: 1 }) * status.length)]}:: Job '${jobName}'\n` +
    `::step-start::${stepName}\n` +
    `::${
      status[Math.floor(faker.number.int({ min: 0, max: 1 }) * status.length)]
    }:: Job '${jobName}' step '${stepName}'\n` +
    `::step-end::${stepName}::${duration}\n` +
    `${generateLogMessage()}\n` +
    `::endgroup::`;

  const files = Array.from({ length: 3 }, () => {
    return {
      id: faker.string.uuid(),
      download: faker.internet.url(),
      filename: faker.lorem.slug(2),
    };
  });

  return {
    task: {
      created: faker.date.anytime().toDateString(),
      service: 'cli',
      status,
      files,
      logs: log,
      taskName: faker.lorem.slug(2),
      id: faker.string.uuid(),
    },
  };
}

export function generateBackup() {
  return {
    backupId: faker.string.uuid(),
    restore: {
      status: 'success',
      restoreLocation: faker.internet.url(),
    },
  };
}

export function generateProjectInfo() {
  const environmentCount = faker.number.int({ min: 1, max: 5 });
  return {
    gitUrl: 'git@github.com:somecompany/some-project.git',
    id: faker.string.uuid(),
    name: faker.lorem.slug(),
    productionEnvironment: 'production',
    productionRoutes: null,
    branches: '^feature/|^(develop|master|test)$',
    created: faker.date.anytime().toDateString(),
    deployTargetConfigs: [],
    developmentEnvironmentsLimit: faker.number.int({ min: 1, max: 5 }),
    pullrequests: faker.datatype.boolean(),
    standbyProductionEnvironment: null,
    standbyRoutes: null,
    __typename: 'Project',
    environments: Array.from({ length: environmentCount }, () => {
      return {
        deployType: faker.helpers.arrayElement(['branch', 'pullRequest', 'production']),
        environmentType: faker.helpers.arrayElement(['development', 'production']),
        id: faker.string.uuid(),
        name: faker.helpers.arrayElement(['master', 'main', 'feature']),
        openshift: {
          friendlyName: faker.word.words(),
          cloudRegion: 'NA',
        },
      };
    }),
  };
}

export const Problem = (args: any) => {
  const recentYear = faker.helpers.arrayElement(['2019', '2020']);
  const vuln_id = `CVE-${recentYear}-${faker.number.int({ min: 1000, max: 99999 })}`;
  const source = faker.helpers.arrayElement(['Lighthouse', 'Drutiny', 'Trivy', 'OWASP ZAP', 'Script']);
  const associatedPackage = faker.word.words();
  const severity = faker.helpers.arrayElement(['UNKNOWN', 'NEGLIGIBLE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
  const description = faker.lorem.paragraph();
  const links = `https://security-tracker.debian.org/tracker/${vuln_id}`;
  const severityScore = `0.${faker.number.int({ min: 1, max: 9 })}`;
  const data = JSON.stringify({ id: `${faker.number.int({ min: 1, max: 100 })}` }, null, '\t');
  const service = faker.helpers.arrayElement(['cli', 'service1']);
  return {
    identifier: vuln_id,
    severity: args.hasOwnProperty('severity') ? args.severity : severity,
    source: args.hasOwnProperty('source') ? args.source : source,
    severityScore: severityScore,
    associatedPackage: associatedPackage,
    service: service,
    description,
    links,
    data,
    fixedVersion: '',
    version: '',
    id: faker.number.int({ max: 1000 }),
  };
};

export const ProblemIdentifier = (val: number) => {
  seed(val);
  const recentYear = faker.helpers.arrayElement(['2019', '2020']);
  const vuln_id = `CVE-${recentYear}-${faker.number.int({ min: 1000, max: 99999 })}`;
  const severity = faker.helpers.arrayElement(['UNKNOWN', 'NEGLIGIBLE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
  const source = faker.helpers.arrayElement(['Harbor', 'Drutiny']);

  return {
    identifier: vuln_id,
    severity: severity,
    source: source,
    problems: Array.from({
      length: faker.number.int({
        min: 1,
        max: 20,
      }),
    }).map(() => {
      return Problem({});
    }),
  };
};

const addTime = (originalDate: string, hoursLimit: number, seedVal: number) => {
  seed(seedVal);
  const date = new Date(originalDate);
  date.setTime(date.getTime() + faker.number.int(hoursLimit * 60 * 60 * 1000));
  return date.toISOString();
};

const deployStatus = () => {
  return faker.helpers.arrayElement(['new', 'pending', 'running', 'cancelled', 'error', 'failed', 'complete']);
};

const getFact = () => {
  const id = `${faker.number.int({ min: 0, max: 99999 })}`;
  const name = faker.helpers.arrayElement([
    'drupal-version',
    'drush-version',
    'admin_toolbar',
    'drupal-core',
    'laravel',
    'composer-version',
  ]);
  const value = faker.helpers.arrayElement(['8.0.1', '9.0.1', '3.2.1', '10.20.2', '4.3.4']);
  const source = faker.helpers.arrayElement(['drush_pml', 'drush_status', 'http_header', 'php-version', 'env']);
  const category = faker.helpers.arrayElement([
    'Application',
    'Framework',
    'Docker configuration',
    'Drupal configuration',
    'Lagoon',
    'Platform',
    'Programming language',
  ]);
  const description = faker.lorem.paragraph();
  const environment = `${faker.number.int({ min: 0, max: 5 })}`;
  const keyFact = false;
  const type = 'TEXT';

  const references = [
    {
      id: faker.number.int(),
      fid: faker.number.int(),
      name: faker.helpers.arrayElement([
        ['nginx.company.amazee.io'],
        ['cli'],
        ['solr'],
        ['php'],
        ['backend.company.amazee.io'],
      ]),
    },
  ];

  return {
    id: id,
    name: name,
    value: value,
    source: source,
    category: category,
    description,
    environment,
    keyFact,
    type,
    references,
  };
};

export const generateEnvironments = (args = Object.create(null)) => {
  if (args['seed']) seed(args['seed']);

  const name = args['name']
    ? args['name']
    : faker.helpers.arrayElement(['master', 'staging', 'development', 'pr-42', 'pr-100', 'pr-175']);
  let deployType, deployBaseRef, deployHeadRef;
  if (/^pr\-/.test(name)) {
    deployType = 'pullrequest';
    deployBaseRef = 'target';
    deployHeadRef = 'source';
  } else {
    deployType = 'branch';
    deployBaseRef = name;
    deployHeadRef = 'source';
  }
  const created = faker.date.anytime().toDateString();
  const updated = addTime(created, 4, args['seed']);
  const deleted = addTime(updated, 2, args['seed']);

  const project: Project = { ...MockAllProjects(args['seed'])[0], factsUi: 1, problemsUi: 1, name: faker.lorem.slug() };

  const environment = {
    id: faker.string.uuid(),
    name,
    project,
    deployType,
    deployBaseRef,
    deployHeadRef,
    deployTitle: name,
    autoIdle: faker.helpers.arrayElement([0, 1]),
    environmentType: name === 'master' ? 'production' : 'development',
    openshiftProjectName: `${project.name}-${name}`.toLowerCase(),
    updated,
    created,
    deleted,
    bulkId: faker.lorem.slug(),
    storages: [],
    route: name === 'master' ? `https://${project.name}.org` : `https://${name}.${project.name}.org`,
    routes: `https://${project.name}.org,https://varnish-${project.name}-org-prod.us.amazee.io,https://nginx-${project.name}-org-prod.us.amazee.io`,
    monitoringUrls: '',
    facts: [],
    insights: [],
  };

  return {
    ...environment,
  };
};

export const getDeployment = (seed: number) => {
  faker.seed(seed);

  const id = faker.string.uuid();
  const created = faker.date.past().toDateString();
  const started = addTime(created, 0.5, seed);
  const completed = addTime(started, 0.75, seed);

  return {
    id,
    name: `build-${id}`,
    status: deployStatus(),
    created,
    started,
    buildStep: faker.word.words(3),
    completed,
    environment: generateEnvironments({ seed }),
    remoteId: faker.number.int(),
    buildLog: 'Buildem logem ipsum.',
  };
};

export const generateBackups = (seed: number) => {
  if (seed) faker.seed(seed);
  const numberOfBackups = faker.number.int({ min: 1, max: 10 });

  const backups = Array.from({ length: numberOfBackups }, () => {
    return {
      id: faker.string.uuid(),
      source: faker.helpers.arrayElement(['nginx', 'solr', 'mariadb']),
      backupId: faker.git.commitSha(),
      created: faker.date.past().toDateString(),
      restore: {
        id: faker.git.commitSha(),
        status: faker.helpers.arrayElement(['completed', 'pending', 'failed']),
        restoreLocation: faker.internet.url(),
      },
    };
  });
  return backups;
};

export const generateFact = (val: number) => {
  seed(val);
  const id = faker.string.uuid();
  const name = faker.helpers.arrayElement([
    'drupal-version',
    'drush-version',
    'admin_toolbar',
    'drupal-core',
    'laravel',
    'composer-version',
  ]);
  const value = faker.helpers.arrayElement(['8.0.1', '9.0.1', '3.2.1', '10.20.2', '4.3.4']);
  const source = faker.helpers.arrayElement(['drush_pml', 'drush_status', 'http_header', 'php-version', 'env']);
  const category = faker.helpers.arrayElement([
    'Application',
    'Framework',
    'Docker configuration',
    'Drupal configuration',
    'Lagoon',
    'Platform',
    'Programming language',
  ]);
  const description = faker.lorem.paragraph();
  const environment = faker.number.int({ min: 0, max: 5 });
  const keyFact = false;
  const type = 'TEXT';

  const references = [
    {
      id: faker.number.int(),
      fid: faker.number.int(),
      name: faker.helpers.arrayElement([
        ['nginx.company.amazee.io'],
        ['cli'],
        ['solr'],
        ['php'],
        ['backend.company.amazee.io'],
      ]),
    },
  ];

  return {
    id: id,
    name: name,
    value: value,
    source: source,
    category: category,
    description,
    environment,
    keyFact,
    type,
    references,
  };
};

export const generateInsight = (val: number) => {
  seed(val);
  return {
    created: faker.date.past().toDateString(),
    downloadUrl: faker.internet.url(),
    file: faker.lorem.slug() + '-cli.json',
    fileId: null,
    id: faker.number.int(),
    service: faker.helpers.arrayElement(['cli', 'php', 'nginx']),
    size: faker.number.float({ precision: 0.1, min: 1, max: 5 }) + 'KB',
    type: 'image',
  };
};
// organizations
export const organizationOwners = () => {
  seed();
  const numberOfOwners = faker.number.int({ min: 1, max: 5 });
  return Array.from({ length: numberOfOwners }, () => {
    return {
      email: faker.internet.email({ provider: 'org.com' }),
      owner: faker.helpers.arrayElement([true, false]),
      __typename: 'OrgUser',
    };
  });
};

export const organizationMembers = () => {
  const numberOfMembers = faker.number.int({ min: 1, max: 10 });

  return Array.from({ length: numberOfMembers }, (_, idx) => {
    seed((idx + 1) * 5);
    return {
      role: faker.helpers.arrayElement(['OWNER', 'MAINTAINER', 'DEVELOPER', 'REPORTER', 'GUEST']),
      user: {
        email: faker.internet.email(),
        comment: 'organization member',
        __typename: 'User',
      },
      __typename: 'GroupMembership',
    };
  });
};

export const organizationGroups = (groupQuota?: number) => {
  const numberOfGroups = groupQuota ? Math.floor(groupQuota / 2) : faker.number.int({ min: 1, max: 10 });
  return Array.from({ length: numberOfGroups }, (_, idx) => {
    seed(idx);
    return {
      id: faker.lorem.slug(),
      name: `${faker.word.words(1)}-group`,
      type: faker.helpers.arrayElement(['null', 'project-default-group']),
      members: organizationMembers(),
      memberCount: faker.number.int({ min: 1, max: 10 }),
      __typename: 'Group',
    };
  });
};

export const organizationEmails = () => {
  seed();

  const numberOfEmails = faker.number.int({ min: 1, max: 3 });

  return Array.from({ length: numberOfEmails }, (_, idx) => {
    return {
      __typename: 'NotificationEmail',
      emailAddress: faker.internet.email(),
      name: `email-${idx + 1}-test`,
    };
  });
};

export const organizationNotifications = () => {
  seed();

  type NotificationType =
    | 'NotificationRocketChat'
    | 'NotificationSlack'
    | 'NotificationMicrosoftTeams'
    | 'NotificationWebhook';

  type Notification<T extends NotificationType> = {
    __typename: T;
    webhook: string;
    name: string;
    channel: string;
  };
  interface Notifications {
    slack: Notification<'NotificationSlack'>[];
    rocketChat: Notification<'NotificationRocketChat'>[];
    teams: Notification<'NotificationMicrosoftTeams'>[];
    webhook: Notification<'NotificationWebhook'>[];
  }

  const notifications: Notifications = {
    slack: [],
    rocketChat: [],
    teams: [],
    webhook: [],
  };

  const generateNotifications = (type: string, seedVal: number) => {
    seed(seedVal);
    // random number of notifications
    const numberOfItems = faker.number.int({ min: 1, max: 3 });

    const getTypename = (type: string) => {
      switch (type) {
        case 'slack':
          return 'NotificationSlack';
        case 'rocketChat':
          return 'NotificationRocketChat';
        case 'teams':
          return 'NotificationMicrosoftTeams';
        case 'webhook':
          return 'NotificationWebhook';
        default:
          return null;
      }
    };

    return Array.from({ length: numberOfItems }, (_, idx) => {
      return {
        __typename: getTypename(type),
        webhook: `${type}.example.com/hooks/${idx + 1}`,
        name: `${type}-notification-${idx + 1}`,
        channel: faker.word.words(1),
      };
    });
  };

  Object.keys(notifications).forEach((key, idx) => {
    notifications[key as keyof Notifications] = generateNotifications(key, idx - 1) as any;
  });

  return notifications;
};

export const organizationProjects = (projectQuota: number) => {
  seed();

  const { slack, rocketChat, webhook } = organizationNotifications();

  return Array.from({ length: Math.floor(projectQuota / 2) }, () => {
    return {
      id: faker.number.int({ max: 300 }),
      name: `project-${faker.word.noun()}`,
      __typename: 'OrgProject',
      groups: organizationGroups(),
      groupCount: organizationGroups().length,
      notifications: [
        { ...slack[0], type: 'SLACK' },
        { ...rocketChat[0], type: 'ROCKETCHAT' },
        { ...webhook[0], type: 'WEBHOOK' },
      ],
    };
  });
};

export const organizationEnvironments = (environmentQuota: number) => {
  seed();
  return Array.from({ length: Math.floor(environmentQuota / 2) }, () => {
    return generateEnvironments({ seed });
  });
};
