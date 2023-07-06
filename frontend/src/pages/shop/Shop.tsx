import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Pagination } from '@mui/material';
import {
  PageContainer,
  CardsWrapper,
  PaginationContainer,
} from './Shop.styles';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import { fetchAllProducts } from '../../redux/reducers/productSlice';
import DropdownOption from '../../components/dropdown-option/DropdownOption';
import CategoryLists from '../../components/categories/CategoryLists';
import ProductCard from '../../components/product-card/ProductCard';

const Shop = () => {
  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Calculate the current page's range of products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  return (
    <PageContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '10px 20px',
        }}
      >
        <CategoryLists />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flexEnd',
          alignItems: 'center',
          margin: '0 20px 5px',
        }}
      >
        <DropdownOption />
      </Box>

      <CardsWrapper>
        {currentProducts.length > 0 &&
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CardsWrapper>
      <PaginationContainer>
        <Pagination
          count={Math.ceil(products.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </PaginationContainer>
    </PageContainer>
  );
};

export default Shop;
