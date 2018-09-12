import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../api';
import { Beer } from '../api/types';
import { RENDER_COUNT_PER_REQUEST } from '../lib/constants';
import BeerListActions, { BeerListActionTypes } from '../redux/beerList/actions';

export function* handleFetchBeers(action: Action<typeof BeerListActions.fetchBeers>) {
  try {
    const fetchedBeers: Beer[] = yield call(api.beers.getAll);
    yield put(BeerListActions.fetchBeersSuccess(fetchedBeers));
    yield put(BeerListActions.renderBeers(RENDER_COUNT_PER_REQUEST));
  } catch (e) {
    console.error(e);

    // It doesn't do anything with it
    yield put(BeerListActions.fetchBeersFailure(e));
  }
}

export default function* beerListSaga() {
  yield takeLatest(BeerListActionTypes.FetchBeers, handleFetchBeers);
}
