import { AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const NavigationBar = styled(AppBar)`
  background-color: black;
  padding: 10px 24px;
`;

export const MenuContainer = styled(Toolbar)`
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BrandLink = styled(Link)`
  text-decoration: none;
  color: orange;
  cursor: pointer;
  font-size: 30px;
`;

export const MenuLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;

  &:hover {
    color: orange;
  }
`;

export const CartLink = styled(Link)`
  text-decoration: none;
  color: white;
  cursor: pointer;
`;
