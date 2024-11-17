import { AdvancedTaskDefinitionArgument } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/tasks/page';
import { CarryOutOutlined } from '@ant-design/icons';

type AdvancedTaskOptions = {
  id: number;
  label: string;
  value: string;
  arguments: AdvancedTaskDefinitionArgument[];
  confirmationText?: string;
};

export const getDefaultTaskOptions = (advancedTasks: AdvancedTaskOptions[] | undefined, blocklist: string[]) => {
  // default task icon used everywhere
  const icon = <CarryOutOutlined />;

  const baseAdvancedTaskOptions = {
    selectable: false,
    title: 'Run an Advanced Task',
    value: 'advancedTasks',
    children: [] as any,
  };

  let options = [
    {
      selectable: false,
      title: 'Run a task',
      value: 'task',
      children: [
        {
          icon,
          label: 'Clear Drupal caches [drush cache-clear]',
          value: 'DrushCacheClear',
        },
        {
          icon,
          label: 'Run Drupal cron [drush cron]',
          value: 'DrushCron',
        },
        {
          icon,
          title: 'Copy database between environments [drush sql-sync]',
          value: 'DrushSqlSync',
        },
        {
          icon,
          label: 'Copy files between environments [drush rsync]',
          value: 'DrushRsyncFiles',
        },
        {
          icon,
          label: 'Generate database backup [drush sql-dump]',
          value: 'DrushSqlDump',
        },
        {
          icon,
          label: 'Generate database and files backup (Drush 8 only) [drush archive-dump]',
          value: 'DrushArchiveDump',
        },
        {
          icon,
          label: 'Generate login link [drush uli]',
          value: 'DrushUserLogin',
        },
      ],
    },
  ];
  // filter default tasks
  options = [
    {
      ...options[0],
      children: options[0].children.filter(option => !blocklist.includes(option.value)),
    },
  ];

  if (advancedTasks && advancedTasks.length) {
    const filteredAdvancedTasks = advancedTasks.filter(task => !blocklist.includes(task.value));

    filteredAdvancedTasks.forEach((advancedTask, idx) => {
      baseAdvancedTaskOptions.children.push({
        icon,
        ...advancedTask,
        // react-key/value warnings
        value: `${advancedTask.value}-${idx}`,
        taskValue: advancedTask.value,
      });
    });

    filteredAdvancedTasks.length && options.push(baseAdvancedTaskOptions);
  }
  return options;
};
