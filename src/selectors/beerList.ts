import _ from 'lodash';
import { createSelector } from 'reselect';

import { Tag } from '../api/types';
import { RootState } from '../redux/types';

namespace BeerListSelectors {
  export const beerListSelector = (state: RootState) => state.beerList;

  export const beerIdsSelector = createSelector(beerListSelector, (beerList) => beerList.beerIds);
  export const beersSelector = createSelector(beerListSelector, (beerList) => beerList.beers);
  export const beersArraySelector = createSelector(
    beerIdsSelector,
    beersSelector,
    (beerIds, beers) => _(beerIds).map((id) => beers[id])
  );
  export const filtersSelector = createSelector(beerListSelector, (beerList) => beerList.filters);
  export const cursorSelector = createSelector(beerListSelector, (beerList) => beerList.cursor);
  export const selectedFilterKeysSelector = createSelector(filtersSelector, (filters) => {
    return _(filters)
      .filter('selected')
      .map('key')
      .value();
  });

  export const filteredBeersSelector = createSelector(
    beersArraySelector,
    selectedFilterKeysSelector,
    (beersArray, selectedFilterKeys) => {
      return beersArray
        .filter(({ tags }) => checkIfTagsMatchesFilters(tags, selectedFilterKeys))
        .orderBy(({ tags }) => matchedFiltersLength(tags, selectedFilterKeys), 'desc')
        .value();
    }
  );

  export const hasMoreItemsToRenderSelector = createSelector(
    filteredBeersSelector,
    cursorSelector,
    (filteredBeersArray, cursor) => cursor < filteredBeersArray.length
  );

  export const beersToBeRenderedSelector = createSelector(
    filteredBeersSelector,
    cursorSelector,
    (filteredBeersArray, cursor) => _.take(filteredBeersArray, cursor)
  );
}

function checkIfTagsMatchesFilters(tags: Tag[], selectedFilterKeys: string[]) {
  return matchedFiltersLength(tags, selectedFilterKeys) > 0;
}

function matchedFiltersLength(beerTags: Tag[], selectedFilterKeys: string[]) {
  return _(beerTags)
    .map('key')
    .intersection(selectedFilterKeys)
    .value().length;
}

export default BeerListSelectors;
