import { Navigate, useLocation } from 'react-router-dom';
import SearchResults from './searchResult';

const SearchResultsPage = () => {
  const location = useLocation();
  const {
    searchResults,
    histogramsData,
    documentsData,
    searchParams,
  } = location.state || {};
  
  if (!searchResults && !histogramsData && !documentsData) {
    return <Navigate to="/search" replace />;
  }


  return (
    <SearchResults
      searchResults={searchResults}
      histogramsData={histogramsData}
      documentsData={documentsData}
      searchParams={searchParams}
    />
  );
};

export default SearchResultsPage;