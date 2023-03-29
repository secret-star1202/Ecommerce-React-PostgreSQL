import {
  BannerSectionContainer,
  Banner,
  BannerImage,
} from './BannerSection.styles';

const BannerSection = () => {
  return (
    <BannerSectionContainer maxWidth={false}>
      <Banner>
        <BannerImage image="https://images.pexels.com/photos/4005033/pexels-photo-4005033.jpeg?auto=compress&cs=tinysrgb&w=800" />
      </Banner>
      <Banner>
        <BannerImage image="https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
      </Banner>
    </BannerSectionContainer>
  );
};

export default BannerSection;
