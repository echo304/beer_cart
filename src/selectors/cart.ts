import { createSelector } from 'reselect';

import { BeerWithCount } from '../redux/beerList/types';
import { RootState } from '../redux/types';

import BeerListSelectors from './beerList';

namespace CartSelectors {
  export const cartSelector = (state: RootState) => state.cart;

  export const addedBeerIdsSelector = createSelector(cartSelector, (cart) => cart.addedBeerIds);
  export const addedBeersCountSelector = createSelector(
    cartSelector,
    (cart) => cart.addedBeersCount
  );
  export const addedBeersArraySelector = createSelector(
    addedBeerIdsSelector,
    addedBeersCountSelector,
    BeerListSelectors.beersSelector,
    (addedBeerIds, addedBeersCount, beers) => {
      return addedBeerIds.map((id) => {
        const currentCountOfBeer = addedBeersCount[id];
        const beer = beers[id] as BeerWithCount;
        beer.count = currentCountOfBeer;
        return beer;
      });
    }
  );
}

export default CartSelectors;
