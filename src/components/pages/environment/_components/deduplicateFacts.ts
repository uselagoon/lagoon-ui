import { FactType } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/(environment-overview)/page';
import { keyFactCategories } from '@/constants/keyFactImageMap';

type KeyfactType = Omit<FactType, 'category'> & {
  category: (typeof keyFactCategories)[number];
};

const deduplicateFacts = (facts: KeyfactType[]) => {
  const seen = new Set();

  const uniqueFacts = facts.filter(fact => {
    const keyFactAllowed = keyFactCategories.includes(fact.category);
    if (!keyFactAllowed) return false;

    const key = `${fact.name}-${fact.category}-${fact.value}`;
    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
  return uniqueFacts;
};

export default deduplicateFacts;
