import { Container, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SectionContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 400px;
  margin-top: 20px;
`;

export const SectionNameContainer = styled(Box)`
  margin: 10px;
`;

export const SectionName = styled(Typography)`
  font-weight: 700;
`;

export const ProductCardsContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const CardImageContainer = styled(Box)`
  position: relative;
`;
