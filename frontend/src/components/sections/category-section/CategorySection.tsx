import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHook';
import { fetchAllCategories } from '../../../redux/reducers/categorySlice';
import { CategorySectionContainer } from './CategorySection.styles';
import { CategoryListButton } from '../../categories/CategoryLists.styles';

const CategorySection = () => {
  const categories = useAppSelector((state) => state.categoryReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  return (
    <CategorySectionContainer maxWidth={false}>
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
    </CategorySectionContainer>
  );
};

export default CategorySection;
