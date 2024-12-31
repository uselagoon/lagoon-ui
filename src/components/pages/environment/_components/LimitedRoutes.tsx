import { FC, useState } from 'react';

import { RoutesWrapper, ShowMore } from '../styles';

interface Props {
  routes: JSX.Element[];
}
const LimitedRoutes: FC<Props> = ({ routes }) => {
  const [expanded, setExpanded] = useState(false);

  const [firstFiveRoutes, ...otherRoutes] = [routes.slice(0, 5), ...routes.slice(5)];
  const leftOverLength = otherRoutes.length;

  const handleExpand = () => setExpanded(true);

  return (
    <RoutesWrapper>
      {firstFiveRoutes}

      {expanded ? otherRoutes : null}

      {leftOverLength > 0 && !expanded ? (
        <ShowMore onClick={handleExpand}>Show {leftOverLength} more ...</ShowMore>
      ) : null}
    </RoutesWrapper>
  );
};

export default LimitedRoutes;
