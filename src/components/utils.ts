import { Problem } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/problems/page';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

import { Task } from './types';

dayjs.extend(duration);
dayjs.extend(utc);

export const getHighestSeverityProblem = (problems: Problem[]) => {
  if (problems.some(p => p.severity === 'CRITICAL')) {
    return 'critical';
  }
  if (problems.some(p => p.severity === 'HIGH')) {
    return 'high';
  }
  if (problems.some(p => p.severity === 'MEDIUM')) {
    return 'medium';
  }
  if (problems.some(p => p.severity === 'LOW')) {
    return 'low';
  }
  return 'low';
};

export const makeSafe = (string: string) => string.toLocaleLowerCase().replace(/[^0-9a-z-]/g, '-');

export const debounce = (fn: (params: any) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return function (val: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.call(null, val);
    }, delay);
  };
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getTaskDuration = (task: Task) => {
  const taskStart = task.started || task.created;
  const durationStart = taskStart ? dayjs.utc(taskStart) : dayjs.utc();
  const durationEnd = task.completed ? dayjs.utc(task.completed) : dayjs.utc();
  const duration = dayjs.duration(durationEnd.diff(durationStart));

  const hours = String(Math.floor(duration.asHours())).padStart(2, '0');
  const minutes = String(duration.minutes()).padStart(2, '0');
  const seconds = String(duration.seconds()).padStart(2, '0');

  let result = `${hours}:${minutes}:${seconds}`;
  return result;
};
