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
    taskName?: string;
    name?: string;
  };
}

export function createTasks(seed?: number): Tasks {
  if (seed) {
    faker.seed(seed);
  }
  const numberOftasks = faker.number.int({ min: 1, max: 10 });
  const tasks = Array.from({ length: numberOftasks }, () => {
    return {
      taskName: faker.word.words(),
      name: faker.helpers.arrayElement(['Drush uli', 'Drush cache-clear', 'Drush sql-dump', 'Custom Task']),
      adminOnlyView: faker.datatype.boolean(),
      created: faker.date.anytime().toDateString(),
      service: 'cli',
      status: faker.helpers.arrayElement(['Pending', 'In progress', 'Completed']),
    };
  });

  return { tasks, environmentSlug: faker.lorem.slug(), projectSlug: faker.lorem.slug() };
}

export function createTask(seed?: number): Task {
  if (seed) {
    faker.seed(seed);
  }

  const generateLogMessage = () => {
    return faker.git.commitMessage();
  };

  const status = faker.helpers.arrayElement(['active', 'succeeded', 'failed']);
  const eventName = faker.word.words();
  const jobName = faker.word.words();
  const stepName = faker.word.words();
  const duration = Math.floor(Math.random() * 10) + 1;

  const log =
    `::group::${eventName}\n` +
    `::${status[Math.floor(Math.random() * status.length)]}:: Job '${jobName}'\n` +
    `::step-start::${stepName}\n` +
    `::${status[Math.floor(Math.random() * status.length)]}:: Job '${jobName}' step '${stepName}'\n` +
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
  faker.seed();
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
  return {
    identifier: vuln_id,
    severity: args.hasOwnProperty('severity') ? args.severity : severity,
    source: args.hasOwnProperty('source') ? args.source : source,
    severityScore: severityScore,
    associatedPackage: associatedPackage,
    description,
    links,
    data,
  };
};

export const ProblemIdentifier = () => {
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

const addTime = (originalDate: string, hoursLimit: number) => {
  const date = new Date(originalDate);
  date.setTime(date.getTime() + faker.number.int(hoursLimit * 60 * 60 * 1000));
  return date.toISOString();
};

const deployStatus = () =>
  faker.helpers.arrayElement(['new', 'pending', 'running', 'cancelled', 'error', 'failed', 'complete']);

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
  const updated = addTime(created, 4);
  const deleted = addTime(updated, 2);

  const project: Project = { ...MockAllProjects[0], factsUi: 1, problemsUi: 1, name: faker.lorem.slug() };

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

export const getDeployment = () => {
  const id = faker.string.uuid();
  const created = faker.date.past().toDateString();
  const started = addTime(created, 0.5);
  const completed = addTime(started, 0.75);

  return {
    id,
    name: `build-${id}`,
    status: deployStatus(),
    created,
    started,
    completed,
    environment: generateEnvironments(),
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

export const generateFact = () => {
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

export const generateInsight = () => {
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
