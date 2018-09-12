import _ from 'lodash';

import { Beer } from '../../api/types';
import { createReducer } from '../utils';

import BeerListActions, { BeerListActionTypes } from './actions';
import { BeerListState } from './types';

export const initialState: BeerListState = {
  isFetching: false,
  beerIds: [],
  beers: {},
  filters: [],
  cursor: 0,
  error: null
};

function fetchBeersSuccess(
  state: BeerListState,
  action: Action<typeof BeerListActions.fetchBeersSuccess>
) {
  const beersArray = action.beers;
  const filters = _.flatten(beersArray.map((beer) => beer.tags));
  const uniqFilters = _.uniqWith(filters, _.isEqual);
  uniqFilters.forEach((filter) => (filter.selected = true));

  return {
    ...state,
    beerIds: _.map(beersArray, 'id'),
    beers: buildNewBeersMapFrom(beersArray),
    filters: uniqFilters
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

function toggleFilter(state: BeerListState, action: Action<typeof BeerListActions.toggleFilter>) {
  const { filterKey } = action;
  const newFilters = _.cloneDeep(state.filters);
  const filterToBeToggled = _.find(newFilters, (filter) => filter.key === filterKey);

  if (filterToBeToggled) {
    filterToBeToggled.selected = !filterToBeToggled.selected;
  }

  return {
    ...state,
    filters: newFilters
  };
}

export default createReducer(
  {
    [BeerListActionTypes.FetchBeersSuccess]: fetchBeersSuccess,
    [BeerListActionTypes.FetchBeersFailure]: fetchBeersFailure,
    [BeerListActionTypes.RenderBeers]: renderBeers,
    [BeerListActionTypes.ToggleFilter]: toggleFilter
  },
  initialState
);
