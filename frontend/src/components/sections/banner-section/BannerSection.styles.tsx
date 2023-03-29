import { Container, Box, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { breakpoints as bp } from '../../../utils/layout';

export const BannerSectionContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const Banner = styled(Box)`
  width: 50%;
  margin: 10px;

  @media (min-width: ${bp.sm}) {
    width: 50%;
  }
`;

export const BannerImage = styled(CardMedia)`
  height: 150px;
  width: 100%;

  @media (min-width: ${bp.sm}) {
    height: 200px;
  }

  @media (min-width: ${bp.md}) {
    height: 400px;
  }
`;
