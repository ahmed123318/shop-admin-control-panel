
export enum ProductStatus {
  ACTIVE = 'Active',
  OUT_OF_STOCK = 'OutOfStock',
  DISCONTINUED = 'Discontinued',
}

export type ProductColor = {
  name: string;
  code?: string;
};

export type ProductDimensions = {
  length: number;
  width: number;
  height: number;
};

export interface Product {
  id?: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  coverImage: string;
  images: string[];
  colors?: ProductColor[];
  weight?: number;
  weightUnit?: 'g' | 'kg';
  dimensions?: ProductDimensions;
  warranty?: string;
  status: ProductStatus;
  categoryId?: string;
  subcategoryId?: string;
  brandId?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
}
