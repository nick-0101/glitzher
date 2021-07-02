import { gql } from '@apollo/client';

const GET_FRONTPAGE = gql`
  query Homepage($page: String, $limit: String, $sortBy: String) {
    products(page: $page, limit: $limit, sortBy: $sortBy) {
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

export { GET_FRONTPAGE, GET_SEARCH };
