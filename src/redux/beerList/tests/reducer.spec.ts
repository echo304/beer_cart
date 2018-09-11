import { Beer } from '../../../api/types';
import BeerListActions from '../actions';
import reducer from '../reducer';

describe('BeerList reducer', () => {
  const defaultState = reducer(undefined, {});

  describe('FETCH_BEERS_SUCCESS', () => {
    let beersArr: Beer[];
    beforeEach(() => {
      beersArr = [
        { id: 1, name: 'beer 1', image: 'url', tags: [], price: 10, stock: 10 },
        { id: 2, name: 'beer 2', image: 'url', tags: [], price: 10, stock: 10 },
        { id: 3, name: 'beer 3', image: 'url', tags: [], price: 10, stock: 10 }
      ];
    });

    it('sets beerIds', () => {
      const nextState = reducer(defaultState, BeerListActions.fetchBeersSuccess(beersArr));

      const expectedBeerIds = [1, 2, 3];
      expect(nextState.beerIds).toEqual(expectedBeerIds);
    });

    it('sets beers', () => {
      const nextState = reducer(defaultState, BeerListActions.fetchBeersSuccess(beersArr));

      const expectedBeers = {
        1: beersArr[0],
        2: beersArr[1],
        3: beersArr[2]
      };
      expect(nextState.beers).toEqual(expectedBeers);
    });
  });
});
