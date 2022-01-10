import React, { useState, useEffect } from "react";
import { withRouter } from 'next/router';
import { useQuery, useMutation } from "@apollo/client";
import Head from 'next/head';

import MainLayout from 'layouts/MainLayout';
import MainNavigation from 'layouts/MainNavigation';
import Navigation from 'components/Navigation';
import { Grid, Form, Select, Icon, Header, Message } from 'semantic-ui-react';

import Breadcrumbs from 'components/Breadcrumbs';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';

import { envVariableTypes, envVariableScopes } from 'lib/util';
import AddEnvVarMutation from 'lib/mutation/AddEnvVar';


export const PageAddEnvVar = () => {
  const defaultEnvVar = {
    type: "",
    typeId: "",
    name: "",
    value: "",
    scope: ""
  }
  const [envVar, setEnvVar] = useState(defaultEnvVar);
  const [scopeValidationFailed, setScopeValidationFailed] = useState(false);
  const [errors, setErrors] = useState([])

  const isTypeIDValid = () => {
    if (envVar.typeId && isNaN(envVar.typeId)) {
      return false;
    }

    if (envVar.typeId && envVar.typeId.length > 9) {
      return false;
    }
    return true;
  }

  const [addEnvVarMutation, { data, loading, error, called }] = useMutation(AddEnvVarMutation);
  
  const handleChange = (e, { value }, select) => {
    const { id } = e.target;
    const name = id || select;
    setEnvVar({ ...envVar, [name]: value });
  };

  const handleSubmit = () => {
    if (envVar.scope === "") {
      setScopeValidationFailed(true);
    }
    else {
      //reset previous errors
      setErrors([]);

      addEnvVarMutation({
        variables: {
          input: {
            type: envVar.type,
            typeId: parseInt(envVar.typeId),
            name: envVar.name,
            value: envVar.value,
            ...(envVar.scope !== "" && {scope: envVar.scope})
          }
        }
      }).then(r => {
        if (r.errors) {
         setErrors(r.errors);
         setEnvVar({...defaultEnvVar, typeId: envVar.typeId, type: envVar.type});
        }
        else {
          setEnvVar(defaultEnvVar);
        }
      });
    }
  };

  return (
    <>
      <Head>
        <title>{`Add Environment Variable | Lagoon`}</title>
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
                  <ProjectBreadcrumb projectSlug={"Add Environment Variable"}/>
                </Breadcrumbs>
                <div className="add-envvar-wrapper">
                  {!error && called && loading &&
                    <Message icon>
                      <Icon name='circle notched' loading />
                      <Message.Content>
                        <Message.Header>Adding environment variable...</Message.Header>
                      </Message.Content>
                    </Message>
                  }
                  {!error && called && data &&
                    <Message success>
                      <Message.Header>Environment variable added</Message.Header>
                    </Message>
                  }
                  {errors && errors.length > 0 &&
                    <Message negative>
                      <Message.Header>Error: Unable to add environment variable</Message.Header>
                      {errors.map((e, k) => <p key={`error-${k}`}>
                          {`There was a problem adding environment variable with ${envVar.type} type id '${envVar.typeId}'`}
                        </p>
                      )}

                    </Message>
                  }
                  <Form loading={called && loading} onSubmit={handleSubmit}>
                    <Form.Group widths='equal'>
                      <Form.Field
                        id={'type'}
                        control={Select}
                        label='Type' 
                        value={envVar && envVar.type}
                        options={envVariableTypes.map(type => ({ key: type, text: type, value: type }))}
                        onChange={(e, { value }) => handleChange(e, { value }, "type")}
                        placeholder='Type, e.g.: Project, Environment' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Input fluid required error={!isTypeIDValid()}
                        id={'typeId'}
                        label='Type ID' 
                        value={envVar.typeId}
                        onChange={handleChange}
                        placeholder='Type ID' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Input fluid required
                        id={'name'}
                        label='name' 
                        value={envVar.name}
                        onChange={handleChange}
                        placeholder='Name' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Input fluid required
                        id={'value'}
                        label='Value' 
                        value={envVar.value}
                        onChange={handleChange}
                        placeholder='Value' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field required error={scopeValidationFailed}
                        id={'scope'}
                        control={Select}
                        label='Scope' 
                        value={envVar && envVar.scope}
                        options={envVariableScopes.map(scope => ({ key: scope, text: scope, value: scope }))}
                        onChange={(e, { value }) => handleChange(e, { value }, "scope")}
                        placeholder='Scope' />
                    </Form.Group>
                    <Form.Button>Submit</Form.Button>
                  </Form>
                </div>
              </>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <style jsx>{`
          .add-envVar-wrapper {
            padding: 2em 9em;
          }
        `}</style>
      </MainLayout>
    </>
  );
};

export default withRouter(PageAddEnvVar);
