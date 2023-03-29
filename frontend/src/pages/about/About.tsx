import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PageContainer = styled(Container)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

const About = () => {
  return (
    <PageContainer
      sx={{ backgroundColor: { xs: 'red', md: 'green', lg: 'blue' } }}
    >
      About Page
    </PageContainer>
  );
};

export default About;
