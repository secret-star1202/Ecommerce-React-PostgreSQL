import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PageContainer = styled(Container)`
  height: 100vh;
  background-color: pink;
`;
const NotFound = () => {
  return <PageContainer>NotFound</PageContainer>;
};

export default NotFound;
