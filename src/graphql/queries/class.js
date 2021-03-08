import { gql } from '@apollo/client';

const ClassesQuery = gql`
  query ClassesQuery($page:Int!, $limit:Int!){
    paginateClasses(page:$page, limit:$limit) {
      docs{
        id
        name
        course_id
      }
      total
    }
  }
`;

export {ClassesQuery}