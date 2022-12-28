interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  categories: Category[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
}
