
export interface Product{
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  taxes?: number
}
export interface createProductDTO extends Omit<Product, 'id' | 'category'>{
  categoryId: number;
}
export interface updateProductDTO extends Partial<createProductDTO>{}
