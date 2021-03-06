import { Beer, Tag } from '../../api/types';

export interface SelectableTag extends Tag {
  selected: boolean;
}

export interface BeerWithCount extends Beer {
  count: number;
}

export interface BeerListState {
  isFetching: boolean;
  beerIds: number[];
  beers: { [beerId: string]: Beer };
  filters: SelectableTag[];
  cursor: number;
  error: string | null;
}
