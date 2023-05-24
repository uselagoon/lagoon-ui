import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import ThemedSkeletonWrapper from '../../styles/ThemedSkeletonWrapper';
import { FieldWrapper, ProjectDetails } from './StyledProjectSidebar';

const ProjectSkeleton = () => {
  return (
    <ThemedSkeletonWrapper>
      <SkeletonTheme baseColor="#d2d2d2" highlightColor="#e1e1e1">
        <ProjectDetails className="details">
          <FieldWrapper className="field-wrapper created">
            <div>
              <label>Created</label>
              <div className="field">
                <Skeleton style={{ minWidth: '200px', maxWidth: '300px' }} />
              </div>
            </div>
          </FieldWrapper>
          <FieldWrapper className="field-wrapper origin">
            <div>
              <label>Origin</label>
              <div className="field">
                <Skeleton style={{ minWidth: '300px', maxWidth: '300px' }} />
              </div>
            </div>
          </FieldWrapper>
          <FieldWrapper className="field-wrapper giturl skeleton">
            <div>
              <label>Git URL</label>
              <div className="field">
                <Skeleton style={{ minWidth: '300px', maxWidth: '300px' }} height={20} />
              </div>
            </div>
          </FieldWrapper>

          <FieldWrapper className="field-wrapper envlimit">
            <div>
              <label>Development environments in use</label>
              <div className="field">
                <Skeleton style={{ minWidth: '300px', maxWidth: '300px' }} />
              </div>
            </div>
          </FieldWrapper>
        </ProjectDetails>
      </SkeletonTheme>
    </ThemedSkeletonWrapper>
  );
};

export default ProjectSkeleton;
