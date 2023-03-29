import { Box, CardMedia, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PageContainer = styled(Container)`
  height: 100%;
  // background-color: pink;
  display: flex;
  flex-direction: column;
`;

export const CartImage = styled(CardMedia)`
  width: 100px;
  height: 100px;
`;

export const CartItemContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: rgb(243, 243, 243);
  padding: 20px;
`;

export const CartItem = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid gray;
`;

export const CartItemDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100px;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const QuantityContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100px;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const ProductCardName = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
`;

export const ProductCardPrice = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
