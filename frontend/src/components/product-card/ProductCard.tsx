import {
  CardImage,
  ProdCard,
  ProductCardButton,
  ProductCardContent,
  ProductCardName,
  ProductCardPrice,
} from './ProductCard.styles';

const ProductCard = () => {
  return (
    <ProdCard>
      <CardImage image="https://img01.ztat.net/article/spp-media-p1/cfc43f5b35ca43e69e35bc6c89586550/86daded655134c0ba55d7cdcc2535bf2.jpg?imwidth=1800&filter=packshot" />
      <ProductCardContent>
        <ProductCardButton variant="outlined" color="inherit">
          ADD TO CART
        </ProductCardButton>
        <ProductCardName>Product Name</ProductCardName>
        <ProductCardPrice>$ 200</ProductCardPrice>
      </ProductCardContent>
    </ProdCard>
  );
};

export default ProductCard;
