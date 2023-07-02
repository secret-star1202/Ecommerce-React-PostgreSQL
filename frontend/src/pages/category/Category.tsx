import { Box, CardMedia, Pagination, Tab, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import DropdownOption from '../../components/dropdown-option/DropdownOption';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import { addToCart } from '../../redux/reducers/cartSlice';
import {
  CardImageContainer,
  CardsWrapper,
  ProdCard,
  ProductCardName,
  ProductCardPrice,
  ProductCardButton,
  ProductCardContent,
  PageContainer,
} from './Category.styles';
import { ChangeEvent, useState } from 'react';
import { PaginationContainer } from '../shop/Shop.styles';

const Category = () => {
  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
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
            <ProdCard key={product.id}>
              <CardImageContainer onClick={() => navigate(`${product.name}`)}>
                <CardMedia component="img" height="200" image={product.image} />
                <Box
                  sx={{
                    position: 'absolute',
                    color: 'white',
                    top: 3,
                    padding: '2px 5px',
                    background: '#32CD32',
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '50px',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '10px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {product.categoryName}
                  </Typography>
                </Box>
              </CardImageContainer>

              <ProductCardContent>
                <ProductCardButton
                  variant="outlined"
                  color="inherit"
                  onClick={() => dispatch(addToCart(product))}
                >
                  ADD TO CART
                </ProductCardButton>
                <ProductCardName
                  sx={{
                    textTransform: 'uppercase',
                  }}
                >
                  {product.name}
                </ProductCardName>
                <ProductCardPrice>$ {product.price}</ProductCardPrice>
              </ProductCardContent>
            </ProdCard>
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
