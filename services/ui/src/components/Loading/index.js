import React, { useState, useEffect, useRef } from 'react';
import { Grid, Item, Dimmer, Loader, Placeholder, Segment } from 'semantic-ui-react';

const ParagraphLines = ({ depth = 1 }) => {
  let lines = [];

  for (let i = 0; i < depth; i++) {
    lines.push(<Placeholder>
    <Placeholder.Paragraph>
      <Placeholder.Line length='medium' />
      <Placeholder.Line length='short' />
      <Placeholder.Line length='medium' />
      <Placeholder.Line length='short' />
    </Placeholder.Paragraph>
  </Placeholder>)
  }
  return lines;
}

const TwoColContent = ({rows, depth}) => {
  let content = [];

  for (let i = 0; i < rows; i++) {
    content.push(<Item key={`item-${i}`}>
      <Item.Content verticalAlign='middle'>
          <Grid columns={2} stackable>
          <Grid.Column>
            <Segment>
              <ParagraphLines depth={depth} />
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment>
              <ParagraphLines depth={depth} />
            </Segment>
          </Grid.Column>
        </Grid>
      </Item.Content>
    </Item>)
  }
  return content;
}

const ThreeColContent = ({rows}) => {
  let content = [];

  for (let i = 0; i < rows; i++) {
    content.push(<Item key={`item-${i}`}>
      <Item.Content verticalAlign='middle'>
          <Grid columns={3} stackable>
          <Grid.Column>
            <Segment>
              <ParagraphLines />
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment>
              <ParagraphLines />
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment>
              <ParagraphLines />
            </Segment>
          </Grid.Column>
        </Grid>
      </Item.Content>
    </Item>)
  }
  return content;
}

export const LoadingContent = () => (
  <Grid columns={3} stackable>
    <Grid.Column>
      <Segment>
        <Placeholder>
          <Placeholder.Header>
              <Placeholder.Line />
              <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </Segment>
    </Grid.Column>

    <Grid.Column>
      <Segment>
        <Placeholder>
          <Placeholder.Header>
              <Placeholder.Line />
              <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </Segment>
    </Grid.Column>

    <Grid.Column>
      <Segment>
        <Placeholder>
          <Placeholder.Header>
              <Placeholder.Line />
              <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </Segment>
    </Grid.Column>
  </Grid>
);

export const LoadingRowsContent = ({rows = 25}) => {
  let items = [];

  for (let i = 0; i < rows; i++) {
    items.push(
      <Item key={`item-${i}`}>
        <Item.Content verticalAlign='middle'>
          <Segment>
            <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
        </Item.Content>
      </Item>
    )
  }

  return <Item.Group divided>{items}</Item.Group>
};

export const LoadingSpinner = () => {
  return(
    <div className="loading-wrapper">
      <Loader size='tiny' active inline='centered'>Loading</Loader>
    </div>
  )
}

export const LoadingEnvironmentRows = ({rows = 2, type, depth = 2}) => {

  console.log('type: ', type);

  return (
    <Item.Group divided>
      <Segment>
        <Placeholder style={{ margin: "40px 0" }}>
          <Placeholder.Line length='long' />
          <Placeholder.Line length='full' />
        </Placeholder>
      </Segment>
      <Segment>
        <Placeholder>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder>
      </Segment>
      {type === "list" ? 
        <LoadingRowsContent rows={"25"} />
      : 
        <>
          <ThreeColContent rows={rows}/>
          <TwoColContent rows={1} depth={depth} />
        </>
      }
    </Item.Group>
  )
};

//TODO: This can be replaced with React's useTransition method when concurrent mode is out of experimental.
export const LazyLoadingContent = ({
    delay = 250,
    ...props
}) => {
  const containerRef = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 300)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return !show ? <div ref={containerRef} className="fallback-fadein"><LoadingRowsContent {...props} /></div> : null;
}

export default LoadingContent;