import { Box, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

export const PageContainer = styled(Container)`
  height: 100%;
`;

export const CardsWrapper = styled(Grid)`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(5, 1fr);
`;

export const PaginationContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin: 30px;
`;
export const ProdCard = styled(Card)`
  width: 200px;
  height: 325px;
  margin: 10px;

  &:hover {
    transform: scale(1.1);
    transition: 0.5s;
  }
`;

export const CardImage = styled(CardMedia)`
  height: 200px;
`;

export const ProductCardContent = styled(CardContent)`
  width: 100%;
`;

export const ProductCardButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProductCardName = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  font-size: 12px;
`;

export const ProductCardPrice = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  font-size: 13px;
`;

export const SingleProductLink = styled(Link)`
  text-decoration: none;
`;
export const CardImageContainer = styled(Box)`
  position: relative;
`;
