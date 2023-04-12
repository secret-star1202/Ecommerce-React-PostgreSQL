import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import { fetchAllCategories } from '../../redux/reducers/categorySlice';
import {
  CategoryListButton,
  CategoryListContainer,
} from './CategoryLists.styles';

const CategoryLists = () => {
  const categories = useAppSelector((state) => state.categoryReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <CategoryListContainer>
      {categories &&
        categories.slice(0, 5).map((category) => (
          <CategoryListButton
            variant="contained"
            key={category.id}
            onClick={() => navigate(`${category.name}`)}
          >
            {category.name}
          </CategoryListButton>
        ))}
    </CategoryListContainer>
  );
};

export default CategoryLists;
