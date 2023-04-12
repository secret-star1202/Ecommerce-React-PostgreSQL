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
import { breakpoints as bp } from '../../utils/layout';

export const PageContainer = styled(Container)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

export const CardsWrapper = styled(Grid)`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: ${bp.sm}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${bp.lg}) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export const PaginationContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin: 30px;
`;
export const ProdCard = styled(Card)`
  width: 150px;
  height: 300px;
  margin: 5px;

  &:hover {
    transform: scale(1.1);
    transition: 0.5s;
  }

  @media (min-width: ${bp.sm}) {
    min-width: 100px;
    min-height: 225px;
    margin: 10px;
  }

  @media (min-width: ${bp.lg}) {
    max-width: 250px;
    height: 300px;
    margin: 10px;
  }
`;

export const CardImage = styled(CardMedia)`
  height: 200px;
`;

export const ProductCardContent = styled(CardContent)`
  width: 100%;
`;

export const ProductCardButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  width: 100%;
`;

export const ProductCardName = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  padding: 2px;
`;

export const ProductCardPrice = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8px;
`;

export const SingleProductLink = styled(Link)`
  text-decoration: none;
`;
export const CardImageContainer = styled(Box)`
  position: relative;
`;
