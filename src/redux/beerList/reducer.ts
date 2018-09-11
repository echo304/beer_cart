import _ from 'lodash';

import { Beer } from '../../api/types';
import { createReducer } from '../utils';

import BeerListActions, { BeerListActionTypes } from './actions';
import { BeerListState } from './types';

export const initialState: BeerListState = {
  isFetching: false,
  beerIds: [],
  beers: {},
  cursor: 0,
  error: null
};

function fetchBeersSuccess(
  state: BeerListState,
  action: Action<typeof BeerListActions.fetchBeersSuccess>
) {
  const beersArray = action.beers;

  return {
    ...state,
    beerIds: _.map(beersArray, 'id'),
    beers: buildNewBeersMapFrom(beersArray)
  };
}

function buildNewBeersMapFrom(beersArray: Beer[]) {
  return beersArray.reduce(
    (beersMap, beer) => {
      beersMap[beer.id] = beer;
      return beersMap;
    },
    {} as BeerListState['beers']
  );
}

function fetchBeersFailure(
  state: BeerListState,
  action: Action<typeof BeerListActions.fetchBeersFailure>
) {
  const { error } = action;
  return {
    ...state,
    error
  };
}

function renderBeers(state: BeerListState, action: Action<typeof BeerListActions.renderBeers>) {
  const { numberOfItemsToRender } = action;
  return {
    ...state,
    cursor: state.cursor + numberOfItemsToRender
  };
}

export default createReducer(
  {
    [BeerListActionTypes.FetchBeersSuccess]: fetchBeersSuccess,
    [BeerListActionTypes.FetchBeersFailure]: fetchBeersFailure,
    [BeerListActionTypes.RenderBeers]: renderBeers
  },
  initialState
);