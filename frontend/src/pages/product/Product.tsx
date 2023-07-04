import { Button, Tab, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { addToCart } from '../../redux/reducers/cartSlice';
import {
  CardImage,
  DetailsBox,
  PageContainer,
  ProductDetailsBox,
  ProductDetailsContainer,
  SingleProductContainer,
} from './Product.styles';
import { useState } from 'react';

const Product = () => {
  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const { name } = useParams();
  const navigate = useNavigate();
  const [buttonClicked, setButtonClicked] = useState(false); // Added state variable

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
    setButtonClicked(true);
  };
  return (
    <PageContainer>
      <Tab label="BACK" onClick={() => navigate(-1)} />
      <SingleProductContainer>
        {products
          .filter((item) => item.name === name)
          .map((item) => (
            <ProductDetailsContainer key={item.id}>
              <ProductDetailsBox>
                <CardImage image={item.image} />
              </ProductDetailsBox>
              <ProductDetailsBox>
                <DetailsBox>
                  <Typography variant="h5">{item.name}</Typography>
                </DetailsBox>
                <DetailsBox>
                  <Typography variant="h6">${item.price}</Typography>
                </DetailsBox>
                <DetailsBox>
                  <Typography variant="subtitle1" gutterBottom>
                    {item.description}
                  </Typography>
                </DetailsBox>
                <DetailsBox
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    p: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleAddToCart(item)} // Use handleAddToCart function
                    sx={{
                      backgroundColor: buttonClicked ? 'green' : 'blue',
                    }}
                  >
                    <Typography>
                      {buttonClicked ? 'ADDED TO CART' : 'ADD TO CART'}
                    </Typography>
                  </Button>
                </DetailsBox>
              </ProductDetailsBox>
            </ProductDetailsContainer>
          ))}
      </SingleProductContainer>
    </PageContainer>
  );
};

export default Product;
