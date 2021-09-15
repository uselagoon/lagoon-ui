import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import AllEnvironmentsFromFacts from 'lib/query/AllEnvironmentsFromFacts';

const useEnvironmentsData = (activeTab, factFilters = [], connectiveSelected, take, skip) => {
  const [environments, setEnvironments] = useState([]);
  const [environmentsCount, setEnvironmentsCount] = useState(0);

  const [getEnvironments, { data: { environmentsByFactSearch } = {}, loading: environmentsLoading }] = useLazyQuery(AllEnvironmentsFromFacts, {
    variables: {
      input: {
        filters: factFilters || [],
        filterConnective: connectiveSelected,
        take: take,
        skip: skip
      }
    }
  });

  useEffect(() => {
    if (activeTab === "Environments") {
      getEnvironments();
    }

    if (environmentsByFactSearch) {
      setEnvironments(environmentsByFactSearch.environments);
      setEnvironmentsCount(environmentsByFactSearch.count);
    }
  }, [activeTab, environmentsByFactSearch]);


  return { environments, environmentsCount, environmentsLoading }
}

export default useEnvironmentsData;