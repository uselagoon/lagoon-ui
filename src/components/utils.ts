import { Problem } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/problems/page';

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
