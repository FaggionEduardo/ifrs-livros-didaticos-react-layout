import { gql } from '@apollo/client';

const UserQuery = gql`
  query UserQuery($page:Int!, $limit:Int!){
    paginateUsers(page:$page, limit:$limit) {
      docs{
        id
        name
        login
        accessLevel
      }
      total
    }
  }
`;

export {UserQuery}