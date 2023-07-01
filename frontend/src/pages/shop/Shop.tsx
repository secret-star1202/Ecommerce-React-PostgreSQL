import { useEffect } from 'react';
import {
  Box,
  CardMedia,
  Pagination,
  PaginationItem,
  Typography,
} from '@mui/material';
import {
  PageContainer,
  CardsWrapper,
  PaginationContainer,
  ProdCard,
  ProductCardButton,
  ProductCardContent,
  ProductCardName,
  ProductCardPrice,
  CardImageContainer,
} from './Shop.styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import { fetchAllProducts } from '../../redux/reducers/productSlice';
import DropdownOption from '../../components/dropdown-option/DropdownOption';
import { addToCart } from '../../redux/reducers/cartSlice';
import CategoryLists from '../../components/categories/CategoryLists';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

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
        {products.length > 0 &&
          products.map((product) => (
            <ProdCard key={product.id}>
              <CardImageContainer
                onClick={() => navigate(`/category/${product.name}`)}
              >
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
          count={10}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </PaginationContainer>
    </PageContainer>
  );
};

export default Shop;
