import { Container, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const NewsletterContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
`;

export const NewsletterContent = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 40px;
  background-color: rgb(243, 243, 243);
`;

export const NewsletterForm = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding: 40px;
  background-color: rgb(243, 243, 243);
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
