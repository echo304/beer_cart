import { Beer } from '../../api/types';

interface AddedBeer {
  addedItemCount: number;
  beer: Beer;
}

export interface CartState {
  addedBeerIds: number[];
  addedBeers: { [beerId: string]: AddedBeer };
}
