import React from "react";
import * as R from "ramda";
import Head from "next/head";
import { Query } from "react-apollo";
import MainLayout from "layouts/MainLayout";
import Me from "lib/query/Me";
import withQueryLoading from "lib/withQueryLoading";
import withQueryError from "lib/withQueryError";
import SshKeys from "../../components/SshKeys";
import AddSshKey from "../../components/SshKeys/AddSshKey";
import { CommonWrapper } from "../../styles/commonPageStyles";

/**
 * Displays the user settings page.
 */
const SettingsPage = () => (
  <>
    <Head>
      <title>Settings</title>
    </Head>
    <Query query={Me} displayName="Me" fetchPolicy="cache-and-network">
      {R.compose(
        withQueryLoading,
        withQueryError
      )(({ data }) => (
        <MainLayout>
          <CommonWrapper>
            <h2>SSH keys</h2>
            <div className="content">
              <SshKeys me={data.me || {}} />
              <AddSshKey me={data.me || {}} />
            </div>
          </CommonWrapper>
        </MainLayout>
      ))}
    </Query>
  </>
);

export default SettingsPage;
