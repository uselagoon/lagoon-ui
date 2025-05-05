import { gql } from '@apollo/client';

export default gql`
  fragment factFields on Fact {
    id
    name
    value
    source
    description
    keyFact
    type
    category
    service
  }
`;
