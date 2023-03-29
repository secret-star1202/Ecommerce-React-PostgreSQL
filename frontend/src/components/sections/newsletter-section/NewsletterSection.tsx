import { Box, Typography, TextField } from '@mui/material';
import {
  NewsletterContainer,
  NewsletterContent,
  NewsletterForm,
  SubscribeButton,
} from './NewsletterSection.styles';

const NewsletterSection = () => {
  return (
    <NewsletterContainer maxWidth={false}>
      <NewsletterContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          Subscribe to our Newsletter
        </Typography>
        <Typography variant="body1" gutterBottom>
          Subscribe now and get 10% off of one order. Be among the first to hear
          about benefits, offers and events.
        </Typography>
      </NewsletterContent>
      <NewsletterForm>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField fullWidth label="Email" />
        </Box>
        <Box
          sx={{
            py: 2,
          }}
        >
          <SubscribeButton variant="contained">Subscribe</SubscribeButton>
        </Box>
      </NewsletterForm>
    </NewsletterContainer>
  );
};

export default NewsletterSection;
