import { Beer } from '../../api/types';

export enum BeerListActionTypes {
  FetchBeers = 'BEER_LIST/FETCH_BEERS',
  FetchBeersSuccess = 'BEER_LIST/FETCH_BEERS_SUCCESS',
  FetchBeersFailure = 'BEER_LIST/FETCH_BEERS_FAILURE',
  RenderBeers = 'BEER_LIST/RENDER_BEERS'
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
}

export default BeerListActions;
