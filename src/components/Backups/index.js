import React from "react";
import moment from "moment";
import RestoreButton from "components/RestoreButton";
import { BackupsHeader, DataTable } from "./StyledBackups";

const Backups = ({ backups }) => (
  <div className="backups">
    <BackupsHeader>
      <label className="source">Source</label>
      <label className="created">Created</label>
      <label className="backupid">Backup id</label>
    </BackupsHeader>

    <DataTable>
      {!backups.length && <div className="data-none">No Backups</div>}
      {backups.map((backup) => (
        <div className="data-row" key={backup.id}>
          <div className="source">{backup.source}</div>
          <div className="created">
            {moment
              .utc(backup.created)
              .local()
              .format("DD MMM YYYY, HH:mm:ss (Z)")}
          </div>

          <div className="backupid">{backup.backupId}</div>
          <div className="download">
            <RestoreButton backup={backup} />
          </div>
        </div>
      ))}
    </DataTable>
  </div>
);

export default Backups;
