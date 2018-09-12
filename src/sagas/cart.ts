import _ from 'lodash';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import api from '../api';
import { Purchase, PurchaseSuccess } from '../api/types';
import BeerListActions from '../redux/beerList/actions';
import CartActions, { CartActionTypes } from '../redux/cart/actions';
import { RootState } from '../redux/types';

export function* handleCheckoutItems(action: Action<typeof BeerListActions.fetchBeers>) {
  const cart = yield select((state: RootState) => state.cart);
  const purchases: Purchase[] = _.map(cart.addedBeersCount, (count, id) => {
    return {
      id: parseInt(id, 10),
      count
    };
  });
  try {
    const purchaseResult: PurchaseSuccess = yield call(api.purchase.post, purchases);
    yield put(CartActions.clearCart());
    console.log(purchaseResult);
    yield put(BeerListActions.fetchBeers());
  } catch (e) {
    console.error(e);
    yield put(BeerListActions.fetchBeersFailure(e));
  }
}

export default function* cartSaga() {
  yield takeLatest(CartActionTypes.CheckoutItems, handleCheckoutItems);
}
