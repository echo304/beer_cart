import { Beer } from '../../api/types';

export enum BeerListActionTypes {
  FetchBeers = 'BEER_LIST/FETCH_BEERS',
  FetchBeersSuccess = 'BEER_LIST/FETCH_BEERS_SUCCESS',
  FetchBeersFailure = 'BEER_LIST/FETCH_BEERS_FAILURE',
  RenderBeers = 'BEER_LIST/RENDER_BEERS',
  ToggleFilter = 'BEER_LIST/TOGGLE_FILTER'
}

namespace BeerListActions {
  export function fetchBeers() {
    return { type: BeerListActionTypes.FetchBeers };
  }

  export function fetchBeersSuccess(beers: Beer[]) {
    return { type: BeerListActionTypes.FetchBeersSuccess, beers };
  }

  export function fetchBeersFailure(error: string) {
    return { type: BeerListActionTypes.FetchBeersFailure, error };
  }

  export function renderBeers(numberOfItemsToRender: number) {
    return { type: BeerListActionTypes.RenderBeers, numberOfItemsToRender };
  }

  export function toggleFilter(filterKey: string) {
    return { type: BeerListActionTypes.ToggleFilter, filterKey };
  }
}

export default BeerListActions;
