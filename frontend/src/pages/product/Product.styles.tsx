import { styled } from '@mui/material/styles';
import { CardMedia, Box, Container } from '@mui/material';
import { breakpoints as bp } from '../../utils/layout';

export const PageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 20px;
`;

export const SingleProductContainer = styled(Box)`
  background: #f5f5f5;
  padding: 30px 20px;
`;

export const ProductDetailsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (min-width: ${bp.md}) {
    flex-direction: row;
  }
`;

export const ProductDetailsBox = styled(Box)`
  width: 50%
  display: flex;
  alignItems: center;
  justifyContent: center;
  box-shadow: 10px red;
  padding: 5px;
`;

export const CardImage = styled(CardMedia)`
  width: 250px;
  height: 250px;

  @media (min-width: ${bp.md}) {
    width: 400px;
    height: 400px;
  }
`;

export const DetailsBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
`;
