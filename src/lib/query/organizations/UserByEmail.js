import gql from 'graphql-tag';

export default gql`
  query getUserByEmail($email: String!){
		user: userByEmail(email: $email) {
			id
			firstName
			lastName
			email
			roles: groupRoles {
				id
				name
				role
			}
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
