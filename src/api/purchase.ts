import { Error, Purchase, PurchaseSuccess } from './types';
// import { apiPost } from './utils';

export async function post(data: Purchase[]): Promise<PurchaseSuccess> {
  // Since Mock API server doesn't support POST purchase operation
  // API call is commented out
  //
  // const url = `http://localhost:3004/purchases`;
  // await apiPost(url, data);

  // This is mock data
  if (Math.random() > 0.7) {
    const errorMsg: Error = {
      title: 'Internal Server Error',
      reason: "Something's seriously wrong..."
    };
    throw JSON.stringify(errorMsg);
  }

  return {
    totalCount: 5,
    totalPrice: 50000
  };
}
