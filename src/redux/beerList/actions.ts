import { Beer } from '../../api/types';

export enum BeerListActionTypes {
  FetchBeers = 'BEER_LIST/FETCH_BEERS',
  FetchBeersSuccess = 'BEER_LIST/FETCH_BEERS_SUCCESS',
  FetchBeersFailure = 'BEER_LIST/FETCH_BEERS_FAILURE',
  RenderBeers = 'BEER_LIST/RENDER_BEERS',
  PutBeerToCart = 'BEER_LIST/PUT_BEER_TO_CART',
  RemoveBeerFromCart = 'BEER_LIST/REMOVE_BEER_FROM_CART'
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

  export function putBeerToCart(beerId: Beer['id']) {
    return { type: BeerListActionTypes.PutBeerToCart, beerId };
  }

  export function removeBeerFromCart(beerId: Beer['id']) {
    return { type: BeerListActionTypes.RemoveBeerFromCart, beerId };
  }
}

export default BeerListActions;
