import { Box, CardMedia, Tab, Typography } from '@mui/material';
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

const Category = () => {
  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const { category } = useParams();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Tab label="BACK" onClick={() => navigate(-1)} />
      </Box>

      <Box>{category}</Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: '35px',
        }}
      >
        <DropdownOption />
      </Box>
      <CardsWrapper>
        {products
          .filter((product) => product.category.name === category)
          .map((product) => (
            <ProdCard key={product.id}>
              <CardImageContainer onClick={() => navigate(`${product.title}`)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.images[0]}
                />
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
                    {product.category.name}
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
                  {product.title}
                </ProductCardName>
                <ProductCardPrice>$ {product.price}</ProductCardPrice>
              </ProductCardContent>
            </ProdCard>
          ))}
      </CardsWrapper>
    </PageContainer>
  );
};

export default Category;
