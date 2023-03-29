import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import { fetchAllCategories } from '../../redux/reducers/categorySlice';

const CategoryLists = () => {
  const categories = useAppSelector((state) => state.categoryReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', m: 1 }}>
      {categories &&
        categories.slice(0, 5).map((category) => (
          <Button
            variant="contained"
            sx={{ m: 1, width: '120px' }}
            key={category.id}
            onClick={() => navigate(`${category.name}`)}
          >
            {category.name}
          </Button>
        ))}
    </Box>
  );
};

export default CategoryLists;
