import { all } from 'redux-saga/effects';

import beerListSaga from './beerList';
import cartSaga from './cart';

export default function* root() {
  yield all([beerListSaga(), cartSaga()]);
}
