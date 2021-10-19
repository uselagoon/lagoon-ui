import React, { useState, useEffect } from "react";
import { withRouter } from 'next/router';
import { useQuery, useMutation } from "@apollo/client";
import gql from 'graphql-tag';
import Head from 'next/head';

import MainLayout from 'layouts/MainLayout';
import MainNavigation from 'layouts/MainNavigation';
import Navigation from 'components/Navigation';
import { Grid, Form, Select, Icon, Checkbox, Message } from 'semantic-ui-react';

import Breadcrumbs from 'components/Breadcrumbs';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';

import AddProjectMutation from 'lib/mutation/AddProject';

export const PageAddProject = ({ router }) => {
  const defaultProject = {
    name: "",
    gitUrl: "",
    productionEnvironment: "",
    branches: "",
    openshift: "",
  }
  const [project, setProject] = useState(defaultProject);
  const [openshiftProjects, setOpenshiftOptions] = useState([]);

  const { data: allOpenshifts, loading: osLoading, error: osError } = useQuery(gql`
    {
      allOpenshifts {
        id
        name
      }
    }
  `);

  const [addProjectMutation, { data, loading, error, called }] = useMutation(AddProjectMutation);
  
  const handleChange = (e, { value }, select) => {
    const { id } = e.target;
    const name = id || select;
    setProject({...project, [name]: value});
  };

  const handleSubmit = () => {
    addProjectMutation({
      variables: {
        input: {
          name: project.name,
          gitUrl: project.gitUrl,
          productionEnvironment: project.productionEnvironment,
          branches: project.branches,
          ...(project.openshift !== "" && { openshift: project.openshift }),
        }
      }
    });

    setProject(defaultProject);
  };

  useEffect(() => {
    if (!osError && !osLoading && allOpenshifts) {
      const os = allOpenshifts.allOpenshifts.map(os => {
        return { key: os.id, text: os.name, value: os.id };        
      })

      setOpenshiftOptions(os);
    }
  }, [allOpenshifts, osLoading, osError]);

  return (
    <>
      <Head>
        <title>{`Add Project | Lagoon`}</title>
      </Head>
      <MainLayout>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={2}>
              <MainNavigation>
                <Navigation />
              </MainNavigation>
            </Grid.Column>
            <Grid.Column width={14} style={{ padding: "0 4em" }}>
              <>
                <Breadcrumbs>
                  <ProjectBreadcrumb projectSlug={"Add new project"} nolink/>
                </Breadcrumbs>
                <div className="add-Project-wrapper">
                  {!error && called && loading &&
                    <Message icon>
                      <Icon name='circle notched' loading />
                      <Message.Content>
                        <Message.Header>Adding project...</Message.Header>
                      </Message.Content>
                    </Message>
                  }
                  {!error && called && data &&
                    <Message success>
                      <Message.Header>Project added</Message.Header>
                    </Message>
                  }
                  {error &&
                    <Message negative>
                      <Message.Header>Error: Unable to add project</Message.Header>
                      <p>{`${error}`}</p>
                    </Message>
                  }
                  <Form loading={called && loading} onSubmit={handleSubmit}>
                    <Form.Group widths='equal'>
                      <Form.Input fluid required
                        id={'name'}
                        label='Name' 
                        value={project.name}
                        onChange={handleChange}
                        placeholder='Project name, e.g.: new-project' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Input fluid required
                        id={'gitUrl'}
                        label='Git Url' 
                        value={project.gitUrl}
                        onChange={handleChange}
                        placeholder='Git url, e.g.: git@github.com:owner/project.git' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Input fluid required
                        id={'productionEnvironment'}
                        label='Production environment' 
                        value={project.productionEnvironment}
                        onChange={handleChange}
                        placeholder='Production environment, e.g.: main' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Input fluid required
                        id={'branches'}
                        label='branches' 
                        value={project.branches}
                        onChange={handleChange}
                        placeholder='Branches, e.g.: ^prod|dev$' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field error={osError}
                        id={'openshift'}
                        control={Select}
                        label='Openshift ID' 
                        value={project && project.openshift}
                        options={openshiftProjects}
                        onChange={(e, { value }) => handleChange(e, { value }, "openshift")}
                        placeholder='Openshift' />
                    </Form.Group>
                    <Form.Button>Submit</Form.Button>
                  </Form>
                </div>
              </>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <style jsx>{`
          .add-project-wrapper {
            padding: 2em 9em;
          }
        `}</style>
      </MainLayout>
    </>
  );
};

export default withRouter(PageAddProject);
