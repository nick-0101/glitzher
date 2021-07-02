import { gql } from '@apollo/client';

const GET_BOOKS = gql`
  {
    books {
      name
      id
    }
  }
`;

const GET_SEARCH = gql`
  query Search($query: String!) {
    results(query: $query) {
      title
      brand
      thumbnail
      url
      price {
        current_price
      }
      reviews {
        rating
      }
    }
  }
`;

export { GET_BOOKS, GET_SEARCH };
