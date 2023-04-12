import {
  Box,
  Button,
  CardMedia,
  Container,
  Tab,
  Typography,
} from '@mui/material';
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

const Product = () => {
  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const { title } = useParams();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Tab label="BACK" onClick={() => navigate(-1)} />
      <SingleProductContainer>
        {products
          .filter((item) => item.title === title)
          .map((item) => (
            <ProductDetailsContainer key={item.id}>
              <ProductDetailsBox>
                <CardImage image={item.images[0]} />
              </ProductDetailsBox>
              <ProductDetailsBox>
                <DetailsBox>
                  <Typography variant="h5">{item.title}</Typography>
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
                    onClick={() => dispatch(addToCart(item))}
                  >
                    <Typography>ADD TO CART</Typography>
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
