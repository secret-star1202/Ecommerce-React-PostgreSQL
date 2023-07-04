import { useState } from 'react';
import {
  CardImage,
  ProdCard,
  ProductCardButton,
  ProductCardContent,
  ProductCardName,
  ProductCardPrice,
} from './ProductCard.styles';
import { useAppDispatch } from '../../hooks/reduxHook';
import { addToCart } from '../../redux/reducers/cartSlice';
import { Typography } from '@mui/material';

const ProductCard = ({ item }: any) => {
  const dispatch = useAppDispatch();
  const [buttonClicked, setButtonClicked] = useState(false); // Added state variable

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
    setButtonClicked(true);
  };
  return (
    <ProdCard>
      <CardImage image="https://img01.ztat.net/article/spp-media-p1/cfc43f5b35ca43e69e35bc6c89586550/86daded655134c0ba55d7cdcc2535bf2.jpg?imwidth=1800&filter=packshot" />
      <ProductCardContent>
        <ProductCardButton
          variant="outlined"
          onClick={() => handleAddToCart(item)} // Use handleAddToCart function
          sx={{
            backgroundColor: buttonClicked ? 'green' : 'inherit',
          }}
        >
          <Typography>
            {buttonClicked ? 'ADDED TO CART' : 'ADD TO CART'}
          </Typography>
        </ProductCardButton>
        <ProductCardName>Product Name</ProductCardName>
        <ProductCardPrice>$ 200</ProductCardPrice>
      </ProductCardContent>
    </ProdCard>
  );
};

export default ProductCard;
