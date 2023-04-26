import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ReactSelect from "react-select";
import Button from "components/Button";
import { SelectWrapper } from "./Styles";
import useTranslation from "lib/useTranslation";

const taskDrushSqlDump = gql`
  mutation taskDrushSqlDump($environment: Int!) {
    taskDrushSqlDump(environment: $environment) {
      id
      name
      status
      created
      started
      completed
      remoteId
      command
      service
    }
  }
`;

const DrushSqlDump = ({ pageEnvironment, onCompleted, onError }) => {
  const t = useTranslation();

  return (
    <Mutation
      mutation={taskDrushSqlDump}
      onCompleted={onCompleted}
      onError={onError}
      variables={{
        environment: pageEnvironment.id,
      }}
    >
      {(taskDrushSqlDump) => {
        return (
          <SelectWrapper>
            <div className="envSelect">
              <label id="dest-env">{t("tasks.addTask.environment")}:</label>
              <ReactSelect
                aria-labelledby="dest-env"
                name="dest-environment"
                value={{
                  label: pageEnvironment.name,
                  value: pageEnvironment.id,
                }}
                options={[
                  {
                    label: pageEnvironment.name,
                    value: pageEnvironment.id,
                  },
                ]}
                isDisabled
                required
              />
            </div>
            <Button action={taskDrushSqlDump}>{t("tasks.addTask.run")}</Button>
          </SelectWrapper>
        );
      }}
    </Mutation>
  );
};

export default DrushSqlDump;
