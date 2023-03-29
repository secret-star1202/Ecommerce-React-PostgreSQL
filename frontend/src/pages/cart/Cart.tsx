import { Box, Typography, Button, Container } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  PageContainer,
  CartItemContainer,
  CartItem,
  CartItemDetails,
  CartImage,
  ProductCardName,
  ProductCardPrice,
  QuantityContainer,
} from './Cart.styles';
import { RootState } from '../../redux/store';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import {
  removeItem,
  clearCart,
  decrementQuantity,
  addToCart,
} from '../../redux/reducers/cartSlice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state: RootState) => state.cartReducer);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (accumulator, item) => accumulator + item.itemQuantity * item.price,
      0
    );
  };

  return (
    <PageContainer>
      <Box
        sx={{ width: '100%', display: 'flex', justifyContent: 'center', my: 4 }}
      >
        <Typography variant="h4">YOUR BAG</Typography>
      </Box>
      {cartItems.length === 0 ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            my: 4,
          }}
        >
          <Typography variant="h6">is currently empty!</Typography>
        </Box>
      ) : (
        <Container>
          <Box>
            {cartItems.map((item) => {
              return (
                <CartItemContainer key={item.id}>
                  <CartItem>
                    <CartItemDetails>
                      <CartImage image={item.images[0]} />
                    </CartItemDetails>

                    <CartItemDetails>
                      <ProductCardName>{item.title}</ProductCardName>
                      <ProductCardPrice>
                        ${item.price * item.itemQuantity}
                      </ProductCardPrice>
                      <Button
                        variant="contained"
                        onClick={() => dispatch(removeItem(item.id))}
                      >
                        remove
                      </Button>
                    </CartItemDetails>
                    <QuantityContainer>
                      <button onClick={() => dispatch(addToCart(item))}>
                        <KeyboardArrowUpIcon />
                      </button>
                      <div>{item.itemQuantity}</div>
                      <button onClick={() => dispatch(decrementQuantity(item))}>
                        <KeyboardArrowDownIcon />
                      </button>
                    </QuantityContainer>
                  </CartItem>
                </CartItemContainer>
              );
            })}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ m: 2 }}>
                Total:${getTotalPrice()}
              </Typography>
              <Button variant="contained" sx={{ width: '100%' }}>
                Checkout
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center ',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: '400px',
                backgroundColor: 'red',
                m: 4,
              }}
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </Box>
        </Container>
      )}
    </PageContainer>
  );
};

export default Cart;
