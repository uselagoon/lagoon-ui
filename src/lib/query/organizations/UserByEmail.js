import gql from 'graphql-tag';

export default gql`
  query getUserByEmail($email: String!){
		user: userByEmail(email: $email) {
			id
			email
			groups {
				id
				name
				projects {
					id
					name
				}
			}
    }
	}
`;
