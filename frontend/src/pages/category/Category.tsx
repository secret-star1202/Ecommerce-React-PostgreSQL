import { Box, Pagination, Tab } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import DropdownOption from '../../components/dropdown-option/DropdownOption';
import { useAppSelector } from '../../hooks/reduxHook';
import { CardsWrapper, PageContainer } from './Category.styles';
import { ChangeEvent, useState } from 'react';
import { PaginationContainer } from '../shop/Shop.styles';
import ProductCard from '../../components/product-card/ProductCard';

const Category = () => {
  const products = useAppSelector((state) => state.productReducer);
  const { category } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate the current page's range of products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const categoryItems = products
    .filter((product) => product.categoryName === category)
    .slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(
    products.filter((product) => product.categoryName === category).length /
      itemsPerPage
  );
  // Handle page change
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <PageContainer>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Tab label="BACK" onClick={() => navigate(-1)} />
      </Box>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '35px',
        }}
      >
        {category}
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '35px',
        }}
      >
        <DropdownOption />
      </Box>
      <CardsWrapper>
        {categoryItems.length > 0 &&
          categoryItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CardsWrapper>
      <PaginationContainer>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </PaginationContainer>
    </PageContainer>
  );
};

export default Category;
