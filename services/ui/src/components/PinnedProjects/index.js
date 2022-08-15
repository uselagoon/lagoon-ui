import { useEffect, useState } from 'react';
import { Card, Grid, Icon, Button, Header, Segment } from 'semantic-ui-react'

import { useLocalStorage } from 'lib/useLocalStorage';
import Link from 'next/link';

const description = [
  'Project description',
].join(' ')

const PinnedProjects = ({ projects = [] }) => {
  const [pinnedProjects, setPinnedProjects] = useState(null);
  const [projectsFromLocalStorage, setProjectsFromLocalStorage] = useLocalStorage("projects", "");

  useEffect(() => {
    if (projectsFromLocalStorage != "") {
      setPinnedProjects(projectsFromLocalStorage.split(','));
    }

  }, [projectsFromLocalStorage])

  return (
    <>
      <Grid columns={2} stretched verticalAlign='middle'>
        <Grid.Column className="">
          <h4>Pinned Projects</h4>
        </Grid.Column>
        <Grid.Column className="" textAlign='right'>
          <Link href={`/profile`}>
            customise pins
          </Link>
        </Grid.Column>
      </Grid>
      {!pinnedProjects && !projectsFromLocalStorage &&
          <>
          <Segment placeholder>
            <Header icon>
              <Icon name='pdf file outline' />
              No projects have been pinned. You can add them under 'pinned projects' in your 'Profile'
            </Header>
            <Link href={`/profile`}>
              <Button primary>Add projects</Button>
            </Link>
          </Segment>
          </>
        }
      {pinnedProjects &&
        <Card.Group itemsPerRow={2}>
          {pinnedProjects.map((project, index) => {
            return (
              <Link key={`pin-${index}`} href={`/projects/${project}`} passHref={true}>
                <Card
                  key={`pinned-project-${index}`}
                  header={`${project}`} 
                  meta={`${project}`}
                  description={description}
                  extra={<span><Icon name="tree" /> environments</span>}
                  />
              </Link>
            )
          })}
        </Card.Group>
      }
    </>
  )
};

export default PinnedProjects;