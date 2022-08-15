import React from 'react';
import { useQuery } from "@apollo/client";
import Head from 'next/head';
import MainLayout from 'layouts/MainLayout';
import Me from 'lib/query/Me';

import { LoadingSpinner } from 'components/Loading';
import { bp } from 'lib/variables';
import { Form, Message, Button } from 'semantic-ui-react';

/**
 * Displays the user profile page.
 */
const ProfilePage = () => {

  const { data, loading, error } = useQuery(Me, {
      displayName: "Me",
      fetchPolicy: "cache-and-network"
  });


console.log(data);

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
            <Form>
                <h2>Profile</h2>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' value={data && data.me.email} />
                </Form.Field>
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First name' value={data && data.me.firstName} />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last name' value={data && data.me.lastName} />
                </Form.Field>
                <Button type='submit'>Submit</Button>
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
