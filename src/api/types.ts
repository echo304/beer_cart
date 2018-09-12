export interface Tag {
  key: string;
  name: string;
}

export interface Beer {
  id: number;
  name: string;
  image: string;
  tags: Tag[];
  price: number;
  stock: number;
}

export interface Purchase {
  id: number;
  count: number;
}

export interface PurchaseSuccess {
  totalCount: number;
  totalPrice: number;
}

export interface Error {
  title: string;
  reason: string;
}
