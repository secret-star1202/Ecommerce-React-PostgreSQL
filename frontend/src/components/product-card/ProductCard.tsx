import { Box, CardMedia, Typography } from '@mui/material';
import {
  ProdCard,
  ProductCardButton,
  ProductCardContent,
  ProductCardName,
  ProductCardPrice,
  CardImageContainer,
} from './ProductCard.styles';
import { useAppDispatch } from '../../hooks/reduxHook';
import { addToCart } from '../../redux/reducers/cartSlice';
import { useNavigate } from 'react-router-dom';
import { ProductCardProps } from '../../types/product';

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <ProdCard key={product.id}>
      <CardImageContainer onClick={() => navigate(`/category/${product.name}`)}>
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
  );
};

export default ProductCard;
