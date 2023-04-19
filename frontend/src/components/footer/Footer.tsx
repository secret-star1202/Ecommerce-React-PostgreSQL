import { Box, Typography, CssBaseline } from '@mui/material';
import { FooterContainer } from './Footer.styles';

const Footer = () => {
  return (
    <FooterContainer maxWidth={false}>
      <Box sx={{ m: 1, p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          INFO
        </Typography>
        <CssBaseline />
        <Typography variant="body1">Contact us</Typography>
        <Typography variant="body1">Customer feedback</Typography>
        <Typography variant="body1">About eShop</Typography>
        <Typography variant="body1">Careers</Typography>
        <Typography variant="body1">Privacy policy</Typography>
      </Box>
      <Box sx={{ m: 1, p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          FOR BUYERS
        </Typography>
        <Typography variant="body1">Shipping costs</Typography>
        <Typography variant="body1">Payment methods</Typography>
        <Typography variant="body1">Returns</Typography>
        <Typography variant="body1">Terms and conditions</Typography>
        <Typography variant="body1">Frequently asked questions</Typography>
      </Box>{' '}
      <Box sx={{ m: 1, p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          SHORTCUTS
        </Typography>
        <CssBaseline />
        <Typography variant="body1">Log in</Typography>
        <Typography variant="body1">Search alert</Typography>
        <Typography variant="body1">Search </Typography>
      </Box>
      <Box sx={{ m: 1, p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          SHOP
        </Typography>
        <CssBaseline />
        <Typography variant="body1">Clothes</Typography>
        <Typography variant="body1">Shoes</Typography>
        <Typography variant="body1">Furniture</Typography>
        <Typography variant="body1">Sale</Typography>
        <Typography variant="body1">New arrivals</Typography>
      </Box>
      <Box sx={{ m: 1, p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          FOLLOW US
        </Typography>
        <CssBaseline />
        <Typography variant="body1">Instagram</Typography>
        <Typography variant="body1">Facebook</Typography>
        <Typography variant="body1">Twitter</Typography>
        <Typography variant="body1">Blog</Typography>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
