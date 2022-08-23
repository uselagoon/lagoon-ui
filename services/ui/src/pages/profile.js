import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from "@apollo/client";
import MostActiveProjects from 'lib/query/MostActiveProjects';
import Me from 'lib/query/Me';
import { useLocalStorage } from 'lib/useLocalStorage';

import Head from 'next/head';
import MainLayout from 'layouts/MainLayout';
import { Dropdown } from 'semantic-ui-react';

import { LoadingSpinner } from 'components/Loading';
import { bp } from 'lib/variables';
import { Form, Message, Button } from 'semantic-ui-react';

/**
 * Displays the user profile page.
 */
const ProfilePage = () => {
  const [projectsList, setProjectsList] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState("");
  const [projectsFromLocalStorage, setProjectsFromLocalStorage] = useLocalStorage("projects", "");

  const { data, loading, error } = useQuery(Me, {
    displayName: "Me",
    fetchPolicy: "cache-and-network"
  });

  const { loading: loadingProjects, projectsError, data: { projects: mostActiveProjects } = {}} = useQuery(MostActiveProjects, {
    variables: {},
  }) || {};

  const onChange = (e, { name, value }) => {
    e.preventDefault();
    setSelectedProjects(value);
  }

  const handleSubmit = () => {
    localStorage.setItem("projects", selectedProjects);
  };

  const preloadProjects = () => {
    let projects = "";
    if (projectsFromLocalStorage != "") {
      projects = projectsFromLocalStorage.split(',');
    }
    return projects;
  }

  useEffect(() => {
    if (mostActiveProjects) {
      setProjectsList(mostActiveProjects.map(p => ({
        key: p.id,
        text: p.name,
        value: p.name
      })));
    }
  }, [projectsFromLocalStorage, mostActiveProjects, loadingProjects, projectsError]);

  return (
  <>
    <Head>
      <title>Profile</title>
    </Head>
    <MainLayout>
      {!loading && error &&
        <Message negative>
          <Message.Header>Error: Unable to load settings</Message.Header>
          <p>{`${error}`}</p>
        </Message>
      }
      {loading && <LoadingSpinner />}
      {!loading && data &&
        <div className="content-wrapper">
          <div className="content">
            <Form onSubmit={handleSubmit}>
                <h2>Profile</h2>
                <Form.Field>
                  <label>Email</label>
                  <input placeholder='Email' defaultValue={data && data.me.email} />
                </Form.Field>
                <Form.Field>
                  <label>First Name</label>
                  <input placeholder='First name' defaultValue={data && data.me.firstName} />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input placeholder='Last name' defaultValue={data && data.me.lastName} />
                </Form.Field>
                <Form.Field>
                  <label>Pinned Projects</label>
                    {!loadingProjects && projectsList &&
                      <Dropdown
                        placeholder='Projects...'
                        fluid
                        multiple
                        search
                        selection
                        loading={loadingProjects || projectsFromLocalStorage == null}
                        options={projectsList}
                        onChange={onChange}
                        defaultValue={preloadProjects()}
                      />
                    }
                </Form.Field>
                <Button type='submit'>Update</Button>
            </Form>
          </div>
        </div>
      }
      <style jsx>{`
        .content-wrapper {
          h2 {
            margin: 38px calc((100vw / 16) * 1) 0;
            @media ${bp.wideUp} {
              margin: 62px calc((100vw / 16) * 2) 0;
            }
            @media ${bp.extraWideUp} {
              margin: 62px calc((100vw / 16) * 3) 0;
            }
          }
          .content {
            margin: 38px calc((100vw / 16) * 1);
            @media ${bp.wideUp} {
              margin: 38px calc((100vw / 16) * 2);
            }
            @media ${bp.extraWideUp} {
              margin: 38px calc((100vw / 16) * 3);
            }
          }
        }
      `}</style>
    </MainLayout>
  </>
)};

export default ProfilePage;
