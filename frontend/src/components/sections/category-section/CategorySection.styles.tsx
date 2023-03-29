import { Container, Box, Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { breakpoints as bp } from '../../../utils/layout';

export const CategorySectionContainer = styled(Container)`
  // display: flex;
  // flex-direction: row;
  // justify-content: center;
  // margin-top: 20px;
  display: none;

  @media (min-width: ${bp.xs}) {
  }

  //display: flex;
  flex-direction: row;
  // justify-content: center;
  // height: 400px;
  margin-top: 20px;
`;

export const SectionNameContainer = styled(Box)`
  margin: 10px;
`;

export const SectionName = styled(Typography)`
  font-weight: 700;
`;

export const CategoryCardContainer = styled(Box)`
  // display: flex;
  // justify-content: center;
  // align-items: center;
`;

export const CategoryCard = styled(Card)`
  // width: 200px;
  // height: 300px;

  // &:hover {
  //   transform: scale(1.05);
  //   transition: 0.5s;
  // }
`;

export const CategoryName = styled(Typography)`
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // font-weight: 700;
  border: 1px solid red;
`;
