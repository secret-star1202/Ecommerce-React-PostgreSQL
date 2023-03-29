import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { breakpoints as bp } from '../../utils/layout';

export const FooterContainer = styled(Container)`
  display: none;

  @media (min-width: ${bp.md}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 30px;
    background-color: rgb(243, 243, 243);
  }
`;
