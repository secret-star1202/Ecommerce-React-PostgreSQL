import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { breakpoints as bp } from '../../utils/layout';

export const ProdCard = styled(Card)`
  width: 150px;
  height: 300px;
  margin: 5px;

  &:hover {
    transform: scale(1.1);
    transition: 0.5s;
  }
  @media (min-width: ${bp.md}) {
    width: 200px;
    height: 325px;
    margin: 10px;
  }
`;

export const CardImage = styled(CardMedia)`
  width: 100px;
  height: 100px;

  @media (min-width: ${bp.md}) {
    width: 100%;
    height: 200px;
  }
`;

export const ProductCardContent = styled(CardContent)`
  width: 100%;
`;

export const ProductCardButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  width: 100%;

  @media (min-width: ${bp.md}) {
  }
`;

export const ProductCardName = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
`;

export const ProductCardPrice = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
`;
