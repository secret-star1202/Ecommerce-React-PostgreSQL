import { Category } from './category';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  image: string;
}

export interface SearchResultsProps {
  filteredProducts: Product[];
  searchTerm: string;
  onItemClick: () => void;
  showSearchResults: boolean;
}

export interface ProductCardProps {
  product: {
    id: number;
    image: string;
    categoryName: string;
    name: string;
    price: number;
  };
}
