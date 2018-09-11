import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../api';
import { Beer } from '../api/types';
import BeerListActions, { BeerListActionTypes } from '../redux/beerList/actions';

export function* handleFetchBeers(action: Action<typeof BeerListActions.fetchBeers>) {
  try {
    const fetchedBeers: Beer[] = yield call(api.beers.getAll);
    yield put(BeerListActions.fetchBeersSuccess(fetchedBeers));
    yield put(BeerListActions.renderBeers(5));
  } catch (e) {
    console.error(e);

    yield put(BeerListActions.fetchBeersFailure(e));
  }
}

export default function* beerListSaga() {
  yield takeLatest(BeerListActionTypes.FetchBeers, handleFetchBeers);
}