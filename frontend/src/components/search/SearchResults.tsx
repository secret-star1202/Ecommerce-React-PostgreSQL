import React from 'react';
import { Product } from '../../types/product';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

interface SearchResultsProps {
  filteredProducts: Product[];
  searchTerm: string;
  onItemClick: () => void;
  showSearchResults: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  filteredProducts,
  searchTerm,
  onItemClick,
  showSearchResults,
}) => {
  const navigate = useNavigate();

  const handleClick = (productName: string) => {
    navigate(`/product/${productName}`);
    onItemClick();
  };

  const startsWithResults = filteredProducts.filter((product) =>
    product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const exactMatchResults = filteredProducts.filter(
    (product) => product.name.toLowerCase() === searchTerm.toLowerCase()
  );

  const results = [...startsWithResults, ...exactMatchResults];

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 5,
        width: '300px',
        color: 'black',
        display: showSearchResults ? 'block' : 'none',
      }}
    >
      {results.map((product) => (
        <div key={product.id}>
          <div onClick={() => handleClick(product.name)}>
            <Box sx={{ px: 1, mx: 2, border: 'none' }}>{product.name}</Box>
          </div>
        </div>
      ))}
    </Box>
  );
};

export default SearchResults;
