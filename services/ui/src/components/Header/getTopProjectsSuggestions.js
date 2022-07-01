import React, { useState, useEffect, Suspense } from "react";
import { useQuery } from "@apollo/client";

import EnvironmentWithDeploymentsQuery from 'lib/query/EnvironmentWithDeployments';

import faker from 'faker';

const getTopProjectsSuggestions = () => {

  // const { loading, error, data } = useQuery(EnvironmentWithDeploymentsQuery, {
  //   variables: { 
  //     openshiftProjectName: 'high-cotton',
  //     limit: 0
  //   },
  //   fetchPolicy: 'network-only'
  // });

  return {projects: [...Array(10)].map(_ => ({
    title: faker.company.companyName(),
    href: faker.internet.url(),
  }))}
}

export default getTopProjectsSuggestions;

