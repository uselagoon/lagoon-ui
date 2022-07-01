import React, { useState, useEffect, Suspense } from "react";
import { useKeycloak } from '@react-keycloak/ssr';
import Head from 'next/head';

import { Grid, Sidebar, Header, Divider } from 'semantic-ui-react';
import MainNavigation from 'layouts/MainNavigation';
import MainLayout from 'layouts/MainLayout';
import Navigation from 'components/Navigation';
import { MultiSelectFilter } from 'components/Filters';

import { LoadingSpinner } from 'components/Loading';


import getTopProjectsSuggestions from 'components/Header/getTopProjectsSuggestions';


//@TODO categories will be fetched from a later 'getFactCategories' query.
export const categories = [
  {
    name: 'Saas'
  },
  {
    name: 'System Projects'
  },
  {
    name: 'Paas'
  }
];


const IndexPage = ({ url }) => {
  const { keycloak } = useKeycloak();
  const loggedIn = keycloak.authenticated;
  const [factCategories, setFactCategories] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  const { projects, projectsLoading } = getTopProjectsSuggestions();

  console.log("Top p:s ", projects)

  const categoryOptions = (categories) => {
    return categories && categories.map(c => ({ value: c.name, label: c.name }));
  };

  const handleCategories = (category) => {
    let addCategoryFilter = category && category.map(c => {
      return ({
        lhsTarget: "FACT",
        name: "lagoon-category",
        contains: c.value
      });
    });

    setCategoriesSelected(addCategoryFilter || []);
  }


  useEffect(() => {
    if (typeof window !== undefined) {
      if (loggedIn) {
        console.log("logged in")
      }
    }
    
    if (categories) {
      setFactCategories(categories);
    }

  }, [loggedIn, categories])

   return (
   <>
    <Head>
      <title>Home | Lagoon</title>
    </Head>
    <MainLayout projects={projects}>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={2}>
            <MainNavigation>
              <Navigation>
                {factCategories.length > 0 &&
                <>
                  <div className="category-filter">
                    <Header size="small">Custom Filters</Header>
                    <MultiSelectFilter
                      title="Categories"
                      loading={!factCategories}
                      options={factCategories && categoryOptions(factCategories)}
                      isMulti={true}
                      onFilterChange={handleCategories}
                    />
                  </div>
                  <Divider />
                </>
                }
              </Navigation>
            </MainNavigation>
          </Grid.Column>
          <Grid.Column width={14} style={{ padding: '0 4em 2em' }}>
            <Sidebar.Pusher>
              <Suspense fallback={<LoadingSpinner />}>
                <h1>Dashboard</h1>
              </Suspense>
            </Sidebar.Pusher>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <style jsx>{`
        .category-filter {
          padding: 0 0 1em;
        }
      `}</style>
    </MainLayout>
  </>
  );
};

export default IndexPage;