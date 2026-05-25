export interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  ingredients: string[];
  featured?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  products: Product[];
}
