import { FactType } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/(environment-overview)/page';

const deduplicateFacts = (facts: FactType[]) => {
  const seen = new Set();

  const uniqueFacts = facts.filter(fact => {
    const key = `${fact.name}-${fact.category}-${fact.value}`;
    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
  return uniqueFacts;
};
export default deduplicateFacts;
