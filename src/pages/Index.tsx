
import { Navigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

const Index = () => {
  const { data, loading } = useQuery(GET_CATEGORIES);
  if (loading) return null;
  const categories = data?.categories || [];
  const firstCategory = categories[0]?.name?.toLowerCase() || 'all';
  return <Navigate to={`/${firstCategory}`} replace />;
};

export default Index;
