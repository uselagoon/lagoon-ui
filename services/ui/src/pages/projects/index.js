import React, { useState, useEffect } from "react";
import Head from 'next/head';
import dynamic from 'next/dynamic';

import { Grid, Sidebar, Header, Divider } from 'semantic-ui-react';
import MainNavigation from 'layouts/MainNavigation';
import MainLayout from 'layouts/MainLayout';
import Navigation from 'components/Navigation';
import { MultiSelectFilter } from 'components/Filters';

import { LoadingRowsWithSpinner } from 'components/Loading';

//@TODO categories will be fetched from getFactCategories query.
export const categories = [
  {
    name: 'Saas'
  },
  {
    name: 'SystemProjects'
  },
  {
    name: 'Paas'
  }
];

/**
 * Displays the projects page.
 */
const ProjectsPage = () => {
  const [factCategories, setFactCategories] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);

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

  const FactsSearch =  dynamic(
    () => import('components/FactsSearch'),
    { loading: ()=> <LoadingRowsWithSpinner rows="25"/> }
  );

  useEffect(() => {
    if (categories) {
      setFactCategories(categories);
    }
  }, categories);

  return (
   <>
    <Head>
      <title>Projects | Lagoon</title>
    </Head>
    <MainLayout>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={2}>
            <MainNavigation>
              <Navigation>
                {factCategories.length > 0 &&
                <>
                  <div className="category-filter">
                    <Header size="small">Projects Filter</Header>
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
          <Grid.Column width={14} style={{ padding: '0 4em' }}>
            <Sidebar.Pusher>
              <FactsSearch categoriesSelected={categoriesSelected} />
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
  )};

export default ProjectsPage;
