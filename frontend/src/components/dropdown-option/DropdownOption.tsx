import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useAppDispatch } from '../../hooks/reduxHook';
import {
  lowestPriceFirst,
  highestPriceFirst,
  alphabetical,
  alphabetical2,
} from '../../redux/reducers/productSlice';
import { DropdownOptionButton } from './DropdownOption.styles';

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useAppDispatch();
  const highestFirst = () => {
    dispatch(highestPriceFirst());
  };
  const lowestFirst = () => {
    dispatch(lowestPriceFirst());
  };
  const alphabetAz = () => {
    dispatch(alphabetical2());
  };
  const alphabetZa = () => {
    dispatch(alphabetical());
  };

  return (
    <>
      <DropdownOptionButton
        variant="contained"
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        sort products
      </DropdownOptionButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={highestFirst}
          sx={{
            width: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Highest Price First
        </MenuItem>
        <MenuItem
          onClick={lowestFirst}
          sx={{
            width: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Lowest Price First
        </MenuItem>
        <MenuItem
          onClick={alphabetAz}
          sx={{
            width: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          A-Z
        </MenuItem>
        <MenuItem
          onClick={alphabetZa}
          sx={{
            width: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Z-A
        </MenuItem>
      </Menu>
    </>
  );
}
