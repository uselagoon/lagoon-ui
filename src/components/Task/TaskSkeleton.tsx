import { SkeletonWrapper } from "components/Deployment/StyledDeployment";
import useTranslation from "lib/useTranslation";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { StyledTask } from "./StyledTask";

const TaskSkeleton = () => {
  const t = useTranslation();

  return (
    <StyledTask className="task">
      <div className="details">
        <div className="field-wrapper created">
          <div>
            <label>{t("task.label.created")}</label>
            <div className="field">
              <Skeleton />
            </div>
          </div>
        </div>
        <div className="field-wrapper service">
          <div>
            <label>{t("task.label.service")}</label>
            <div className="field">
              <Skeleton />
            </div>
          </div>
        </div>
        <div className="field-wrapper status">
          <div>
            <label>{t("task.label.status")}</label>
            <div className="field">
              <Skeleton />
            </div>
          </div>
        </div>
      </div>

      <SkeletonTheme baseColor="#222" highlightColor="#9a9a9a">
        <SkeletonWrapper>
          <Skeleton style={{ height: "200px" }} />
        </SkeletonWrapper>
      </SkeletonTheme>
    </StyledTask>
  );
};

export default TaskSkeleton;
