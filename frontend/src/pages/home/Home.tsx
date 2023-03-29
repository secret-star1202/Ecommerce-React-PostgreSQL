import BannerSection from '../../components/sections/banner-section/BannerSection';
import CategorySection from '../../components/sections/category-section/CategorySection';
import MostPopularSection from '../../components/sections/popular-section/MostPopularSection';
import NewArrivalsSection from '../../components/sections/new-arrivals-section/NewArrivalsSection';
import NewsletterSection from '../../components/sections/newsletter-section/NewsletterSection';

const Home = () => {
  return (
    <>
      <BannerSection />
      <CategorySection />
      <NewArrivalsSection />
      <MostPopularSection />
      <NewsletterSection />
    </>
  );
};

export default Home;
