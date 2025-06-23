import React, { useState } from 'react';

import Button from 'components/Button';
import Prepare from 'components/RestoreButton/Prepare';
import { isValidUrl } from 'lib/util';
import {useLazyQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";

function humanFileSize(size) {
  if (!size) {
    return [false, null];
  }
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const formatted = (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];

  return [formatted.length > 5, formatted];
}

const getRestoreLocation = gql`
  query getEnvironment($environmentID: Int!) {
    environment: environmentById(id: $environmentID) {
      backups {
        backupId
        restore {
          restoreLocation
        }
      }
    }
  }
`;

/**
 * A button to restore a backup.
 */
const RestoreButton = ({ backup: { backupId, restore }, environmentID }) => {
  const [restoreDownloads, setRestoreDownloads] = useState({});
  const [getRestore, { loading, error, data }] = useLazyQuery(getRestoreLocation, {
    variables: {
      environmentID: environmentID,
    },
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const allBackups = data?.environment?.backups;
      const targetBackup = allBackups.find(b => b.backupId === backupId);
      const restoreData = targetBackup?.restore;

      if (restoreData.restoreLocation && isValidUrl(restoreData.restoreLocation)) {
        const { restoreLocation } = restoreData;
        setRestoreDownloads(prevUrls => ({
          ...prevUrls,
          [backupId]: restoreLocation,
        }));

        window.open(restoreLocation, '_blank', 'noopener,noreferrer');
      } else {
        console.error("Error fetching restore");
      }
    },
    onError: (error) => {
      console.error('Error fetching restore:', error);
    },
  });

  const handleDownload = () => {
    if (loading) return;
    const restoreDownload = restoreDownloads[backupId];

    if (restoreDownload) {
      window.open(restoreDownload, '_blank', 'noopener,noreferrer');
    } else {
      getRestore();
    }
  };

  if (!restore) return <Prepare backupId={backupId} />;
  if (restore.status === 'pending') return <Button disabled>Retrieving ...</Button>;
  if (restore.status === 'failed') return <Button disabled>Retrieve failed</Button>;

  const [isOverflowing, formattedSize] = humanFileSize(restore?.restoreSize);

  if (error) {
    return <p>Error preparing download. Please try again.</p>;
  }
  return (
    <Button
      variant={`download ${isOverflowing ? 'btn-download-lg' : ''}`}
      action={() => handleDownload()}
    >
      {loading ? 'Preparing...' : formattedSize ? `Download (${formattedSize})` : "Download"}
    </Button>
  );
};

export default RestoreButton;
