import { Container, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { breakpoints as bp } from '../../../utils/layout';

export const SectionContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 20px;
`;

export const SectionNameContainer = styled(Box)`
  margin: 10px;
`;

export const SectionName = styled(Typography)`
  font-weight: 700;
`;

export const ProductCardsContainer = styled(Box)`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: ${bp.sm}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const CardImageContainer = styled(Box)`
  position: relative;
`;
