import {
  Box,
  Button,
  CardMedia,
  Container,
  Tab,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { addToCart } from '../../redux/reducers/cartSlice';

export const PageContainer = styled(Container)`
  height: 100vh;
`;
const Product = () => {
  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const { title } = useParams();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Tab label="BACK" onClick={() => navigate(-1)} />
      <Box
        sx={{
          bgcolor: '#F5F5F5',
          padding: '30px 20px',
        }}
      >
        {products
          .filter((item) => item.title === title)
          .map((item) => (
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
              key={item.id}
            >
              <Box
                sx={{
                  width: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 4,
                  p: 1,
                }}
              >
                <CardMedia
                  component="img"
                  image={item.images[0]}
                  sx={{
                    height: '400px',
                    width: '400px',
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 4,
                  p: 1,
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    p: 2,
                  }}
                >
                  <Typography variant="h5">{item.title}</Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6">${item.price}</Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '20px 30px',
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    {item.description}
                  </Typography>
                </Box>
                <Box
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
                </Box>
              </Box>
            </Container>
          ))}
      </Box>
    </PageContainer>
  );
};

export default Product;
