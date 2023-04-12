import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { breakpoints as bp } from '../../utils/layout';

export const DropdownOptionButton = styled(Button)`
  margin: 3px;
  white-space: wrap;
  font-size: 8px;

  @media (min-width: ${bp.md}) {
    font-size: 10px;
  }
`;
