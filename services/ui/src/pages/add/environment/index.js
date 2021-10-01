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

import { deploymentTypes, environmentTypes } from 'lib/util';
import AddEnvironmentMutation from 'lib/mutation/AddEnvironment';

export const PageAddEnvironment = ({ router }) => {
  const defaultEnvironment = {
    name: "",
    project: 0,
    environmentType: "",
    deployType: "",
    deployBaseRef: "",
    openshiftProjectName: "",
    kubernetesNamespaceName: ""
  }
  const [environment, setEnvironment] = useState(defaultEnvironment);
  const [projects, setProjectOptions] = useState([]);

  const { data: allProjects, loading: projectsLoading, error: projectsError } = useQuery(gql`
    {
      allProjects {
        id
        name
        created
        gitUrl
        environments {
          name
          route
          environmentType
        }
      }
    }
`);

  const [addEnvironmentMutation, { data, loading, error, called }] = useMutation(AddEnvironmentMutation);
  
  const handleChange = (e, { value }, select) => {
    const { id } = e.target;
    const name = id || select;
    setEnvironment({...environment, [name]: value});
  };

  const handleSubmit = () => {
    addEnvironmentMutation({
      variables: {
        input: {
          name: environment.name,
          project: environment.project,
          ...(environment.environmentType !== "" && { environmentType: environment.environmentType }),
          ...(environment.deployType !== "" && { deployType: environment.deployType }),
          ...(environment.deployBaseRef !== "" && { deployBaseRef: environment.deployBaseRef }),
          ...(environment.openshiftProjectName !== "" && { openshiftProjectName: environment.openshiftProjectName }),
          ...(environment.kubernetesNamespaceName !== "" && { kubernetesNamespaceName: environment.kubernetesNamespaceName })
        }
      }
    });

    setEnvironment(defaultEnvironment);
  };

  useEffect(() => {
    if (!projectsError && !projectsLoading && allProjects) {
      const projects = allProjects.allProjects.map(p => {
        const { id, name } = p || null;
        return { key: id, text: name, value: id };        
      })

      setProjectOptions(projects);
    }
  }, [allProjects, projectsLoading, projectsError]);

  return (
    <>
      <Head>
        <title>{`Add Environment | Lagoon`}</title>
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
                  <ProjectBreadcrumb projectSlug={"Add new environment"} nolink/>
                </Breadcrumbs>
                <div className="add-environment-wrapper">
                  {!error && called && loading &&
                    <Message icon>
                      <Icon name='circle notched' loading />
                      <Message.Content>
                        <Message.Header>Adding environment...</Message.Header>
                      </Message.Content>
                    </Message>
                  }
                  {!error && called && data &&
                    <Message success>
                      <Message.Header>Environment added</Message.Header>
                    </Message>
                  }
                  {error &&
                    <Message negative>
                      <Message.Header>Error: Unable to add environment</Message.Header>
                      <p>{`${error}`}</p>
                    </Message>
                  }
                  <Form loading={called && loading} onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Field required loading={projectsLoading}
                        id={'project'}
                        control={Select}
                        label='Project'
                        options={projects}
                        onChange={(e, { value }) => handleChange(e, {value}, "project")}
                        placeholder='Project ID'
                      />
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Input fluid required
                        id={'name'}
                        label='Name' 
                        value={environment.name}
                        onChange={handleChange}
                        placeholder='Environment name, e.g.: main' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field required
                        id={'environmentType'}
                        control={Select}
                        label='Environment Type'
                        value={environment && environment.environmentType}
                        options={environmentTypes.map(type => ({ key: type, text: type, value: type }))}
                        onChange={(e, { value }) => handleChange(e, {value}, "environmentType")}
                        placeholder='Type, e.g: PRODUCTION' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field required
                        id={'deployType'}
                        control={Select}
                        label='Deployment Type' 
                        value={environment && environment.deployType}
                        options={deploymentTypes.map(type => ({ key: type, text: type, value: type }))}
                        onChange={(e, { value }) => handleChange(e, {value}, "deployType")}
                        placeholder='Deployment type, e.g: BRANCH' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Input fluid required
                        id={'deployBaseRef'}
                        label='Deployment Base Reference' 
                        value={environment.deployBaseRef}
                        onChange={handleChange}
                        placeholder='Deployment Base Reference, e,g: main' />
                    </Form.Group>
                    <Message
                      info
                      size='small'
                      content='Fill out either associated Openshift project name or Kubernetes namespace'
                    />
                    <Form.Group widths='equal'>
                      <Form.Input fluid
                        id={'openshiftProjectName'}
                        label='Openshift project name' 
                        disabled={environment.kubernetesNamespaceName !== ""}
                        value={environment.openshiftProjectName}
                        onChange={handleChange}
                        placeholder='Openshift project name, e.g: project_name' />
                      <Form.Input fluid
                        id={'kubernetesNamespaceName'}
                        label='Kubernetes namespace'
                        disabled={environment.openshiftProjectName !== ""}
                        value={environment.kubernetesNamespaceName}
                        onChange={handleChange}
                        placeholder='Kubernetes namespace, e.g: project_name' />
                    </Form.Group>
                    <Form.Button>Submit</Form.Button>
                  </Form>
                </div>
              </>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <style jsx>{`
          .add-environment-wrapper {
            padding: 2em 9em;
          }
        `}</style>
      </MainLayout>
    </>
  );
};

export default withRouter(PageAddEnvironment);
