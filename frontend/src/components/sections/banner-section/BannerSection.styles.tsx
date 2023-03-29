import { Container, Box, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BannerSectionContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  height: 400px;
`;

export const Banner = styled(Box)`
  width: 50%;
  margin: 10px;
`;

export const BannerImage = styled(CardMedia)`
  height: 400px;
  width: 100%;
`;
