import { BeerListState } from './beerList/types';
import { CartState } from './cart/types';

export interface RootState {
  beerList: BeerListState;
  cart: CartState;
}
