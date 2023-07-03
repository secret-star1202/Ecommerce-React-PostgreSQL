import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import {
  MenuContainer,
  NavigationBar,
  MenuLink,
  BrandLink,
  CartLink,
} from './Navbar.styles';
import { useAppSelector } from '../../hooks/reduxHook';
import { RootState } from '../../redux/store';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Product } from '../../types/product';
import SearchResults from '../search/SearchResults';

const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '300px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = () => {
  const { cartItems } = useAppSelector((state: RootState) => state.cartReducer);
  const authInfo = useAppSelector((state) => state.authReducer);
  const userInfo = useAppSelector((state) => state.authReducer);
  const [searchTerm, setSearchTerm] = useState('');
  const products = useAppSelector((state) => state.productReducer);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // eslint-disable-next-line
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    // Perform filtering based on the search term
    const filteredProducts = products.filter((product: Product) => {
      const title = product.name.toLowerCase();
      const query = searchValue.toLowerCase();
      return title.startsWith(query) || title === query;
    });

    setFilteredProducts(filteredProducts.slice(0, 5));
    setShowSearchResults(true);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform search operation based on the search term
    const filteredProducts = products.filter((product: Product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
    setSearchTerm('');
  };

  const handleItemClick = () => {
    setShowSearchResults(false); // Hide search results when an item is clicked
    setSearchTerm(''); //clear input field
  };

  const setUserImage = () => {
    if (userInfo && userInfo.userInfo?.avatar) {
      return (
        <Avatar
          alt=""
          src={userInfo.userInfo.avatar}
          sx={{ height: '25px', width: '25px', border: '50%' }}
        />
      );
    }
  };

  const getItemsCount = () => {
    return cartItems.reduce(
      (accumulator, item) => accumulator + item.itemQuantity,
      0
    );
  };
  return (
    <>
      <NavigationBar position="static">
        <Toolbar>
          <Box
            sx={{
              width: '150px',
            }}
          >
            <Typography variant="h6" noWrap component="div">
              <BrandLink to="/">eSHOP</BrandLink>
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Search onSubmit={handleSearchSubmit}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Search>
            {searchTerm && filteredProducts.length > 0 && (
              <SearchResults
                searchTerm={searchTerm}
                filteredProducts={filteredProducts}
                onItemClick={handleItemClick}
                showSearchResults={showSearchResults}
              />
            )}
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              width: '150px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={'0'} color="error">
                <CartLink to="/">
                  <FavoriteBorderIcon />
                </CartLink>
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={getItemsCount() || '0'} color="error">
                <CartLink to="/cart">
                  <ShoppingCartOutlinedIcon />
                </CartLink>
              </Badge>
            </IconButton>
            {authInfo.loggedIn ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CartLink to="/profile"> {setUserImage()}</CartLink>
              </Box>
            ) : (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <CartLink to="/login">
                  <AccountBoxOutlinedIcon />
                </CartLink>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </NavigationBar>
      <MenuContainer>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box>
            <Typography variant="h6" noWrap sx={{ m: 1 }}>
              <MenuLink to="/">HOME</MenuLink>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" noWrap sx={{ m: 1 }}>
              <MenuLink to="/shop">SHOP</MenuLink>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" noWrap sx={{ m: 1 }}>
              <MenuLink to="/blog">BLOG</MenuLink>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" noWrap sx={{ m: 1 }}>
              <MenuLink to="/about">ABOUT</MenuLink>
            </Typography>
          </Box>
        </Box>
      </MenuContainer>
    </>
  );
};
export default Navbar;
