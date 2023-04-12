import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { breakpoints as bp } from '../../utils/layout';

export const CategoryListContainer = styled(Box)``;

export const CategoryListButton = styled(Button)`
  margin: 2px;
  width: 15px;
  font-size: 6px;

  @media (min-width: ${bp.md}) {
    font-size: 10px;
    width: 120px;
  }
`;
