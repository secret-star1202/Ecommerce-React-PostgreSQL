import { CardMedia, CardContent, Container } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHook';
import { fetchAllCategories } from '../../../redux/reducers/categorySlice';
import {
  CategorySectionContainer,
  CategoryCardContainer,
  CategoryCard,
  CategoryName,
} from './CategorySection.styles';

const CategorySection = () => {
  const categories = useAppSelector((state) => state.categoryReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  return (
    <CategorySectionContainer maxWidth={false}>
      {categories.slice(0, 5).map((category) => (
        <Container
          onClick={() => navigate(`${category.name}`)}
          key={category.id}
        >
          {/* <CategoryCardContainer>
            <CategoryCard>
              <CardMedia
                sx={{ height: 250, width: '100%' }}
                image={category.image}
              />
              <CardContent>
              </CardContent>
            </CategoryCard>
          </CategoryCardContainer> */}
          <CategoryName>{category.name}</CategoryName>
        </Container>
      ))}
    </CategorySectionContainer>
  );
};

export default CategorySection;
