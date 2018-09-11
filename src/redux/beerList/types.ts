import { Beer } from '../../api/types';

export interface BeerListState {
  isFetching: boolean;
  beerIds: number[];
  beers: { [beerId: string]: Beer };
  cursor: number;
  error: string | null;
}
