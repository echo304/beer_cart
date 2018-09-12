import { Purchase, PurchaseSuccess } from './types';
import { apiPost } from './utils';

export async function post(data: Purchase[]): Promise<PurchaseSuccess> {
  const url = `http://localhost:3004/purchases`;
  await apiPost(url, data);

  // This is mock data
  return {
    totalCount: 5,
    totalPrice: 50000
  };
}
