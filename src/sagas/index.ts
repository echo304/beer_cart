import { all } from 'redux-saga/effects';

import beerListSaga from './beerList';

export default function* root() {
  yield all([beerListSaga()]);
}
