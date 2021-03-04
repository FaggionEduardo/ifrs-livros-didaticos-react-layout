import { gql } from '@apollo/client';

const BooksQuery = gql`
  query BooksQuery($page:Int!, $limit:Int!){
    paginateBooks(page:$page, limit:$limit) {
      docs{
        id
        name
        code
        author
        volume
        quantity
      }
      total
    }
  }
`;

export {BooksQuery}