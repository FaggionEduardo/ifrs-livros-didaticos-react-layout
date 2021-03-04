import { gql } from '@apollo/client';

const CategoryQuery = gql`
  query CategoryQuery($page:Int!, $limit:Int!){
    paginateCategories(page:$page, limit:$limit) {
      docs{
        id
        name
      }
      total
    }
  }
`;

export {CategoryQuery}