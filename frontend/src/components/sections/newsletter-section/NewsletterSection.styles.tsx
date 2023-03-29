import { Container, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { breakpoints as bp } from '../../../utils/layout';

export const NewsletterContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-top: 50px;

  @media (min-width: ${bp.md}) {
    flex-direction: row;
  }
`;

export const NewsletterContent = styled(Box)`
  display: flex;
  width: 100%;
  background-color: rgb(243, 243, 243);

  @media (min-width: ${bp.md}) {
    flex-direction: column;
    width: 60%;
    padding: 40px;
  }
`;

export const NewsletterForm = styled(Box)`
  display: flex;
  width: 100%;
  background-color: rgb(243, 243, 243);

  @media (min-width: ${bp.md}) {
    flex-direction: column;
    width: 40%;
    padding: 40px;
  }
`;

export const SubscribeButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: orange;
  color: black;

  &:hover {
    background-color: transparent;
  }
`;
