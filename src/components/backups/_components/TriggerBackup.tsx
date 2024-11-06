import { Fragment, useState } from 'react';

import { DeploymentsData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/deployments/page';
import taskDrushActiveDump from '@/lib/mutation/taskDrushActiveDump';
import taskDrushSqlDump from '@/lib/mutation/taskDrushSqlDump';
import { ApolloError, useMutation } from '@apollo/client';
import { RefetchFunction } from '@apollo/client/react/hooks/useSuspenseQuery';
import { Button, Confirm, FormItem, LoadingSkeleton, useNotification } from '@uselagoon/ui-library';
import { Form, Radio } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { RadioGroup, StyledBackupTrigger } from './styles';

interface Props {
  environment: DeploymentsData['environment'];
  refetch: RefetchFunction<
    DeploymentsData,
    {
      openshiftProjectName: string;
      limit: null | number;
    }
  >;
  skeleton?: false;
}
interface PropsWithSkeleton {
  skeleton: true;
}

/**
 *
 * currently not supported - running "backups tasks"
 */

const TriggerBackup = (props: Props | PropsWithSkeleton) => {
  if (props.skeleton) {
    return (
      <StyledBackupTrigger>
        <div className="description">
          Trigger a backup on <LoadingSkeleton width={60} />
        </div>
        <Button size="middle">Deploy</Button>
      </StyledBackupTrigger>
    );
  }
  const [backupSelectForm] = useForm();
  const [backupTriggerDisabled, setBackupTriggerDisabled] = useState(true);

  const { environment } = props;
  const { id, deployType, deployBaseRef, deployTitle } = environment;

  const mutationOptions = {
    onError: (err: ApolloError) => {
      console.error(err);

      errorNotification.trigger();
    },
    variables: {
      environment: id,
    },
    onCompleted: () => {
      successNotification.trigger();
    },
    refetchQueries: ['getEnvironment'],
  };

  const [drushActiveDump, { loading: drushActiveDumpLoading, error: activeError }] = useMutation(
    taskDrushActiveDump,
    mutationOptions
  );

  const [drushSqlDump, { loading: drushSqlDumpLoading, error: sqlError }] = useMutation(
    taskDrushSqlDump,
    mutationOptions
  );

  // error and success notifications
  const errorNotification = useNotification({
    type: 'error',
    title: 'Backup failed',
    content: (activeError || sqlError)?.message,
    requiresManualClose: true,
  });

  const successNotification = useNotification({
    type: 'success',
    title: 'Backup successful',
    content: null,
    requiresManualClose: false,
  });

  const updateTriggerStatus = () => {
    const validValues = ['DrushSqlDump', 'DrushArchiveDump'];
    const selected = backupSelectForm.getFieldValue('backup_type');
    setBackupTriggerDisabled(!validValues.includes(selected));
  };

  const SelectBackup = (
    <Form form={backupSelectForm}>
      <FormItem name="backup_type">
        <RadioGroup onChange={updateTriggerStatus}>
          <Radio value="DrushSqlDump"> Generate database backup [drush sql-dump] </Radio>
          <Radio value="DrushArchiveDump">Generate database and files backup (Drush 8 only) [drush archive-dump]</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
  );

  const handleBackupTrigger = async () => {
    const selected = backupSelectForm.getFieldValue('backup_type');

    if (selected === 'DrushSqlDump') {
      await drushActiveDump();
    } else {
      await drushSqlDump();
    }
  };

  return (
    <StyledBackupTrigger>
      <Fragment key="success-notification-holder">{successNotification.contextHolder}</Fragment>
      <Fragment key="error-notification-holder"> {errorNotification.contextHolder}</Fragment>

      <div className="description">
        {deployType === 'branch' && `Trigger a backup on branch ${deployBaseRef}.`}
        {deployType === 'pullrequest' && `Trigger a backup on pull request ${deployTitle}.`}
        {deployType === 'promote' && `Trigger a backup from environment ${environment.project.name}-${deployBaseRef}.`}
      </div>

      <Confirm
        title="Select backup to run"
        placement="rightTop"
        okText="Trigger"
        icon={null}
        okButtonProps={{ disabled: backupTriggerDisabled, loading: false }}
        onConfirm={handleBackupTrigger}
        description={SelectBackup}
      >
        <Button size="middle" loading={drushActiveDumpLoading || drushSqlDumpLoading}>
          Backup
        </Button>
      </Confirm>
    </StyledBackupTrigger>
  );
};

export default TriggerBackup;
